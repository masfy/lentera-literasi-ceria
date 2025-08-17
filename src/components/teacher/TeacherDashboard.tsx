import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LenteraLogo } from "@/components/LenteraLogo";
import { CheckCircle, Clock, AlertCircle, Users, BookOpen, LogOut, Eye } from "lucide-react";

interface TeacherData {
  id: string;
  nama: string;
  email: string;
  kelasBinaan: string[];
}

interface TeacherDashboardProps {
  teacherData: TeacherData;
  onReviewReport: (reportId: string) => void;
  onLogout: () => void;
}

export const TeacherDashboard = ({ teacherData, onReviewReport, onLogout }: TeacherDashboardProps) => {
  const [pendingReports] = useState([
    {
      id: "RPT003",
      siswa: { nama: "Andi Pratama", kelas: "5A" },
      judulBuku: "Malin Kundang",
      pengarang: "Cerita Rakyat",
      tanggal: "2024-01-16",
      ringkasan: "Cerita ini mengisahkan tentang seorang anak yang durhaka kepada ibunya. Malin Kundang yang sudah kaya raya menyangkal ibunya yang miskin..."
    },
    {
      id: "RPT004", 
      siswa: { nama: "Sari Dewi", kelas: "5A" },
      judulBuku: "Si Kancil dan Buaya",
      pengarang: "Penulis Indonesia",
      tanggal: "2024-01-16",
      ringkasan: "Si Kancil yang cerdik berhasil menipu buaya-buaya di sungai untuk menyeberang. Dengan kelicikannya, Si Kancil bisa lolos dari bahaya..."
    }
  ]);

  const [recentlyReviewed] = useState([
    {
      id: "RPT001",
      siswa: { nama: "Budi Santoso", kelas: "5B" },
      judulBuku: "Laskar Pelangi", 
      status: "Disetujui",
      poinDiberikan: 25,
      tanggalReview: "2024-01-15"
    },
    {
      id: "RPT002",
      siswa: { nama: "Maya Sari", kelas: "5A" },
      judulBuku: "Sang Pemimpi",
      status: "Perlu Revisi", 
      poinDiberikan: 0,
      tanggalReview: "2024-01-14"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disetujui": return "bg-success/10 text-success border-success/20";
      case "Perlu Revisi": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const totalStudents = 42; // Mock data
  const totalReportsThisMonth = 28;
  const avgReadingScore = 78;

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <LenteraLogo size="md" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-foreground">{teacherData.nama}</p>
              <p className="text-sm text-muted-foreground">
                Kelas {teacherData.kelasBinaan.join(', ')}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Selamat datang, {teacherData.nama.split(' ')[0]}! 👨‍🏫
          </h1>
          <p className="text-xl text-muted-foreground">
            Pantau dan berikan feedback untuk laporan membaca siswa
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{pendingReports.length}</div>
              <p className="text-xs text-muted-foreground">Laporan baru hari ini</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Siswa di kelas binaan</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Bulan Ini</CardTitle>
              <BookOpen className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{totalReportsThisMonth}</div>
              <p className="text-xs text-muted-foreground">↑ 12% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
              <CheckCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{avgReadingScore}</div>
              <p className="text-xs text-muted-foreground">Skor membaca kelas</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Menunggu Review ({pendingReports.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Sudah Direview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Laporan Menunggu Persetujuan
                </CardTitle>
                <CardDescription>
                  Review dan berikan feedback untuk laporan membaca siswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div 
                      key={report.id} 
                      className="border border-border/50 rounded-lg p-4 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{report.judulBuku}</h4>
                          <p className="text-sm text-muted-foreground">oleh {report.pengarang}</p>
                          <p className="text-sm text-primary font-medium">
                            {report.siswa.nama} • Kelas {report.siswa.kelas}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{report.tanggal}</p>
                          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20 mt-1">
                            Menunggu Review
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-sm text-muted-foreground mb-1">Ringkasan:</p>
                        <p className="text-sm">{report.ringkasan.substring(0, 150)}...</p>
                      </div>

                      <Button 
                        variant="teacher" 
                        onClick={() => onReviewReport(report.id)}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4" />
                        Review Laporan
                      </Button>
                    </div>
                  ))}

                  {pendingReports.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                      <p className="text-muted-foreground">Semua laporan sudah direview! 🎉</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviewed">
            <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Laporan yang Sudah Direview
                </CardTitle>
                <CardDescription>
                  Riwayat review dan feedback yang telah diberikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyReviewed.map((report) => (
                    <div 
                      key={report.id} 
                      className="border border-border/50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{report.judulBuku}</h4>
                          <p className="text-sm text-primary font-medium">
                            {report.siswa.nama} • Kelas {report.siswa.kelas}
                          </p>
                          <p className="text-xs text-muted-foreground">Direview: {report.tanggalReview}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant="secondary" className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          {report.poinDiberikan > 0 && (
                            <p className="text-sm font-medium text-success">+{report.poinDiberikan} poin</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};