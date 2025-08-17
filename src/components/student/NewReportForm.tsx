import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LenteraLogo } from "@/components/LenteraLogo";
import { ArrowLeft, Upload, BookOpen, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface NewReportFormProps {
  studentData: { id: string; nama: string };
  onBack: () => void;
  onSubmit: (reportData: any) => void;
}

export const NewReportForm = ({ studentData, onBack, onSubmit }: NewReportFormProps) => {
  const [formData, setFormData] = useState({
    judulBuku: "",
    pengarang: "", 
    ringkasan: "",
    fotoBuku: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast({
          title: "File tidak valid",
          description: "Mohon pilih file gambar (JPG, PNG, dll.)",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({ ...prev, fotoBuku: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judulBuku || !formData.pengarang || !formData.ringkasan) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (formData.ringkasan.length < 50) {
      toast({
        title: "Ringkasan terlalu pendek",
        description: "Ringkasan minimal 50 karakter untuk menunjukkan pemahaman yang baik",
        variant: "destructive", 
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        idSiswa: studentData.id,
        judulBuku: formData.judulBuku,
        pengarang: formData.pengarang,
        ringkasan: formData.ringkasan,
        fotoBuku: formData.fotoBuku ? "uploaded_photo_url" : null,
      };

      const response = await api.submitReport(reportData);

      if (response.success) {
        onSubmit(reportData);
        
        toast({
          title: "Laporan berhasil dikirim! 🎉",
          description: "Guru akan meninjau laporan Anda segera",
        });
      } else {
        toast({
          title: "Gagal mengirim laporan",
          description: response.message || "Terjadi kesalahan saat mengirim laporan",
          variant: "destructive",
        });
      }
    } catch (_error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Tidak dapat terhubung ke server",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <LenteraLogo size="md" />
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">{studentData.nama}</p>
            <p className="text-sm text-muted-foreground">Laporan Baru</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-lantern p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-glow">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lapor Aktivitas Membaca</h1>
          <p className="text-muted-foreground">Ceritakan buku yang baru saja kamu baca!</p>
        </div>

        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Detail Buku
            </CardTitle>
            <CardDescription>
              Isi informasi tentang buku yang telah kamu baca
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="judul">Judul Buku *</Label>
                  <Input
                    id="judul"
                    placeholder="Contoh: Laskar Pelangi"
                    value={formData.judulBuku}
                    onChange={(e) => handleInputChange('judulBuku', e.target.value)}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pengarang">Nama Pengarang *</Label>
                  <Input
                    id="pengarang"
                    placeholder="Contoh: Andrea Hirata"
                    value={formData.pengarang}
                    onChange={(e) => handleInputChange('pengarang', e.target.value)}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto">Foto Sampul Buku (Opsional)</Label>
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="foto" 
                    className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {formData.fotoBuku ? formData.fotoBuku.name : "Klik untuk upload foto (maksimal 5MB)"}
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ringkasan">Ringkasan & Refleksi *</Label>
                <Textarea
                  id="ringkasan"
                  placeholder="Ceritakan tentang isi buku dan apa yang kamu pelajari dari buku ini. Minimal 50 karakter."
                  value={formData.ringkasan}
                  onChange={(e) => handleInputChange('ringkasan', e.target.value)}
                  rows={6}
                  required
                  className="border-primary/20 focus:border-primary resize-none"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Minimal 50 karakter untuk refleksi yang baik</span>
                  <span className={formData.ringkasan.length >= 50 ? "text-success" : ""}>
                    {formData.ringkasan.length}/50
                  </span>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h4 className="font-medium text-accent mb-2">💡 Tips Menulis Ringkasan Yang Baik:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ceritakan siapa tokoh utama dalam cerita</li>
                  <li>• Jelaskan konflik atau masalah yang terjadi</li>
                  <li>• Bagikan pelajaran atau hikmah yang kamu dapatkan</li>
                  <li>• Gunakan bahasamu sendiri, jangan copy paste!</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  variant="student" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Mengirim..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Kirim Laporan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
