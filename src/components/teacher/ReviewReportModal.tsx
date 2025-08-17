import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, BookOpen, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  id: string;
  siswa: { nama: string; kelas: string };
  judulBuku: string;
  pengarang: string;
  tanggal: string;
  ringkasan: string;
  fotoBuku?: string;
}

interface ReviewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: ReportData;
  onApprove: (reportId: string, feedback: string, points: number) => void;
  onReject: (reportId: string, feedback: string) => void;
}

export const ReviewReportModal = ({ 
  isOpen, 
  onClose, 
  reportData, 
  onApprove, 
  onReject 
}: ReviewReportModalProps) => {
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleApprove = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback diperlukan",
        description: "Mohon berikan feedback untuk siswa",
        variant: "destructive",
      });
      return;
    }

    if (points < 1 || points > 30) {
      toast({
        title: "Poin tidak valid",
        description: "Poin harus antara 1-30",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onApprove(reportData.id, feedback, points);
      toast({
        title: "Laporan disetujui! ✅",
        description: `${reportData.siswa.nama} mendapat ${points} poin`,
      });
      resetForm();
      onClose();
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Alasan revisi diperlukan",
        description: "Mohon berikan alasan mengapa laporan perlu direvisi",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onReject(reportData.id, feedback);
      toast({
        title: "Laporan diminta revisi",
        description: `Feedback telah dikirim ke ${reportData.siswa.nama}`,
        variant: "destructive",
      });
      resetForm();
      onClose();
      setIsSubmitting(false);
    }, 1000);
  };

  const resetForm = () => {
    setFeedback("");
    setPoints(20);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Review Laporan Membaca
          </DialogTitle>
          <DialogDescription>
            Berikan feedback dan penilaian untuk laporan siswa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student & Book Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informasi Siswa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Nama Siswa</Label>
                  <p className="font-medium">{reportData.siswa.nama}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Kelas</Label>
                  <p className="font-medium">{reportData.siswa.kelas}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tanggal Lapor</Label>
                  <p className="font-medium">{reportData.tanggal}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Informasi Buku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Judul Buku</Label>
                  <p className="font-medium">{reportData.judulBuku}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Pengarang</Label>
                  <p className="font-medium">{reportData.pengarang}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                    Menunggu Review
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ringkasan & Refleksi Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                <p className="text-sm leading-relaxed">{reportData.ringkasan}</p>
              </div>
              
              <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="text-sm font-medium text-accent mb-2">💡 Poin Evaluasi:</h4>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <p>✓ Pemahaman cerita</p>
                    <p>✓ Identifikasi tokoh utama</p>
                    <p>✓ Konflik/masalah dalam cerita</p>
                  </div>
                  <div>
                    <p>✓ Pelajaran yang dipetik</p>
                    <p>✓ Penggunaan bahasa sendiri</p>
                    <p>✓ Refleksi personal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Berikan Feedback & Penilaian</CardTitle>
              <CardDescription>
                Feedback yang konstruktif akan membantu siswa berkembang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="points" className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent" />
                  Poin yang Diberikan (1-30)
                </Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  max="30"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                  className="w-32"
                />
                <p className="text-xs text-muted-foreground">
                  Panduan: 1-10 (Perlu Perbaikan), 11-20 (Cukup Baik), 21-30 (Sangat Baik)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback untuk Siswa</Label>
                <Textarea
                  id="feedback"
                  placeholder="Contoh: Ringkasan yang bagus! Kamu sudah bisa menjelaskan tokoh utama dan konflik dengan baik. Untuk kedepannya, coba tambahkan refleksi personal tentang pelajaran yang kamu dapatkan."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Berikan feedback yang memotivasi dan konstruktif
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              className="flex-1"
              disabled={isSubmitting}
            >
              <XCircle className="h-4 w-4" />
              {isSubmitting ? "Memproses..." : "Minta Revisi"}
            </Button>
            <Button 
              variant="success" 
              onClick={handleApprove}
              className="flex-1"
              disabled={isSubmitting}
            >
              <CheckCircle className="h-4 w-4" />
              {isSubmitting ? "Memproses..." : "Setujui Laporan"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};