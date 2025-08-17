import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { NewReportForm } from "@/components/student/NewReportForm";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import { ReviewReportModal } from "@/components/teacher/ReviewReportModal";
import { api } from "@/lib/api";

type UserType = 'student' | 'teacher' | null;
type ViewType = 'login' | 'dashboard' | 'new-report' | 'history';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [userData, setUserData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Mock report data for teacher review
  const mockReportData = {
    id: "RPT003",
    siswa: { nama: "Andi Pratama", kelas: "5A" },
    judulBuku: "Malin Kundang",
    pengarang: "Cerita Rakyat",
    tanggal: "2024-01-16",
    ringkasan: "Cerita ini mengisahkan tentang seorang anak yang durhaka kepada ibunya. Malin Kundang yang sudah kaya raya menyangkal ibunya yang miskin ketika ia kembali ke kampung halaman. Akibat perbuatannya, ia dikutuk menjadi batu. Dari cerita ini saya belajar bahwa kita harus selalu menghormati dan berbakti kepada orang tua. Tidak boleh menyangkal atau malu dengan keadaan orang tua kita. Kebahagiaan dan kesuksesan yang kita raih seharusnya membuat kita semakin menghargai orang yang telah berjasa dalam hidup kita, terutama orang tua."
  };

  const handleLogin = (userType: UserType, user: any) => {
    setCurrentUser(userType);
    setUserData(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserData(null);
    setCurrentView('login');
    setSelectedReportId(null);
  };

  const handleNewReport = () => {
    setCurrentView('new-report');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleSubmitReport = (reportData: any) => {
    // Report submission is handled in NewReportForm component
    setCurrentView('dashboard');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleReviewReport = (reportId: string) => {
    setSelectedReportId(reportId);
  };

  const handleApproveReport = async (reportId: string, feedback: string, points: number) => {
    try {
      const response = await api.approveReport(reportId, feedback, points);
      if (response.success) {
        setSelectedReportId(null);
        // Refresh the teacher dashboard data
      }
    } catch (error) {
      console.error('Error approving report:', error);
    }
  };

  const handleRejectReport = async (reportId: string, feedback: string) => {
    try {
      const response = await api.rejectReport(reportId, feedback);
      if (response.success) {
        setSelectedReportId(null);
        // Refresh the teacher dashboard data
      }
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  // Login view
  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Student views
  if (currentUser === 'student') {
    if (currentView === 'new-report') {
      return (
        <NewReportForm
          studentData={userData}
          onBack={handleBackToDashboard}
          onSubmit={handleSubmitReport}
        />
      );
    }

    return (
      <StudentDashboard
        studentData={userData}
        onNewReport={handleNewReport}
        onViewHistory={handleViewHistory}
        onLogout={handleLogout}
      />
    );
  }

  // Teacher views
  if (currentUser === 'teacher') {
    return (
      <>
        <TeacherDashboard
          teacherData={userData}
          onReviewReport={handleReviewReport}
          onLogout={handleLogout}
        />
        <ReviewReportModal
          isOpen={!!selectedReportId}
          onClose={() => setSelectedReportId(null)}
          reportData={mockReportData}
          onApprove={handleApproveReport}
          onReject={handleRejectReport}
        />
      </>
    );
  }

  return null;
};

export default Index;
