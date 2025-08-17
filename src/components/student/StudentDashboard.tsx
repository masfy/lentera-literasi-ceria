import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LenteraLogo } from "@/components/LenteraLogo";
import { BookOpen, Trophy, Star, Plus, History, LogOut } from "lucide-react";
import readingHeroImage from "@/assets/reading-hero.png";

interface StudentData {
  id: string;
  nama: string;
  kelas: string;
  email: string;
  totalPoin: number;
  level: string;
}

interface StudentDashboardProps {
  studentData: StudentData;
  onNewReport: () => void;
  onViewHistory: () => void;
  onLogout: () => void;
}

export const StudentDashboard = ({ studentData, onNewReport, onViewHistory, onLogout }: StudentDashboardProps) => {
  const [recentReports] = useState([
    {
      id: "RPT001",
      judulBuku: "Laskar Pelangi",
      pengarang: "Andrea Hirata",
      tanggal: "2024-01-15",
      status: "Disetujui",
      poin: 25
    },
    {
      id: "RPT002", 
      judulBuku: "Si Kancil dan Buaya",
      pengarang: "Penulis Indonesia",
      tanggal: "2024-01-10",
      status: "Menunggu Persetujuan",
      poin: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disetujui": return "success";
      case "Menunggu Persetujuan": return "warning";
      case "Perlu Revisi": return "destructive";
      default: return "secondary";
    }
  };

  const getLevelProgress = (poin: number) => {
    if (poin < 50) return { level: "Pembaca Pemula", next: 50, progress: (poin / 50) * 100 };
    if (poin < 150) return { level: "Pembaca Aktif", next: 150, progress: ((poin - 50) / 100) * 100 };
    if (poin < 300) return { level: "Pembaca Mahir", next: 300, progress: ((poin - 150) / 150) * 100 };
    return { level: "Master Pembaca", next: 500, progress: ((poin - 300) / 200) * 100 };
  };

  const levelInfo = getLevelProgress(studentData.totalPoin);

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <LenteraLogo size="md" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-foreground">{studentData.nama}</p>
              <p className="text-sm text-muted-foreground">Kelas {studentData.kelas}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Halo, {studentData.nama.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                Ayo lanjutkan petualangan membacamu hari ini!
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="lantern" size="lg" onClick={onNewReport} className="flex-1">
                <Plus className="h-5 w-5" />
                Lapor Aktivitas Membaca
              </Button>
              <Button variant="outline" onClick={onViewHistory}>
                <History className="h-4 w-4" />
                Riwayat
              </Button>
            </div>
          </div>

          <div className="relative">
            <img 
              src={readingHeroImage} 
              alt="Ilustrasi membaca" 
              className="w-full h-auto rounded-2xl shadow-glow float-gentle"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Poin</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{studentData.totalPoin}</div>
              <p className="text-xs text-muted-foreground">Poin dari laporan yang disetujui</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level Saat Ini</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{levelInfo.level}</div>
              <div className="w-full bg-secondary rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-lantern h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${levelInfo.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {levelInfo.next - studentData.totalPoin} poin lagi ke level berikutnya
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Buku Dibaca</CardTitle>
              <BookOpen className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {recentReports.filter(r => r.status === "Disetujui").length}
              </div>
              <p className="text-xs text-muted-foreground">Laporan yang telah disetujui</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Laporan Terbaru
            </CardTitle>
            <CardDescription>
              Lihat status laporan membaca terbarumu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div 
                  key={report.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{report.judulBuku}</h4>
                    <p className="text-sm text-muted-foreground">oleh {report.pengarang}</p>
                    <p className="text-xs text-muted-foreground">{report.tanggal}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {report.poin > 0 && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">+{report.poin} poin</p>
                      </div>
                    )}
                    <Badge variant="secondary" className={`
                      ${getStatusColor(report.status) === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                      ${getStatusColor(report.status) === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                      ${getStatusColor(report.status) === 'destructive' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                    `}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {recentReports.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada laporan. Ayo mulai membaca!</p>
              </div>
            )}

            <div className="pt-4 border-t border-border/50 mt-6">
              <Button variant="outline" onClick={onViewHistory} className="w-full">
                Lihat Semua Riwayat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};