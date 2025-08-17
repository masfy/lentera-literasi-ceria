import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LenteraLogo } from "@/components/LenteraLogo";
import { BookOpen, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface LoginFormProps {
  onLogin: (userType: 'student' | 'teacher', userData: any) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.loginStudent(studentEmail, studentPassword);
      
      if (response.success && response.data) {
        onLogin('student', response.data);
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${(response.data as any).nama}!`,
        });
      } else {
        toast({
          title: "Login Gagal",
          description: response.message || "Periksa kembali email dan password Anda.",
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
    
    setIsLoading(false);
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.loginTeacher(teacherEmail, teacherPassword);
      
      if (response.success && response.data) {
        onLogin('teacher', response.data);
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${(response.data as any).nama_guru}!`,
        });
      } else {
        toast({
          title: "Login Gagal", 
          description: response.message || "Periksa kembali email dan password Anda.",
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
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-warm">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <LenteraLogo size="xl" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Selamat Datang</h1>
          <p className="text-muted-foreground">Masuk ke Jurnal Literasi Lentera</p>
        </div>

        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>Pilih jenis akun Anda</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Siswa
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Guru
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="andi@sekolah.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="••••••••"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="student" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memuat..." : "Masuk Sebagai Siswa"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="teacher">
                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="guru@sekolah.com"
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="••••••••"
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="teacher" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Memuat..." : "Masuk Sebagai Guru"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground w-full">
              Lupa password? Hubungi administrator sekolah.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
