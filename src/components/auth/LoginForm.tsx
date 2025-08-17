import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LenteraLogo } from "@/components/LenteraLogo";
import { BookOpen, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    
    // Simulate API call - In real implementation, this would call the Google Sheets API
    setTimeout(() => {
      if (studentEmail && studentPassword) {
        // Mock student data
        const studentData = {
          id: "NIS001",
          nama: "Andi Pratama",
          kelas: "5A",
          email: studentEmail,
          totalPoin: 150,
          level: "Pembaca Pemula"
        };
        
        onLogin('student', studentData);
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${studentData.nama}!`,
        });
      } else {
        toast({
          title: "Login Gagal",
          description: "Periksa kembali email dan password Anda.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (teacherEmail && teacherPassword) {
        // Mock teacher data
        const teacherData = {
          id: "GURU001",
          nama: "Bu Sri Wahyuni",
          email: teacherEmail,
          kelasBinaan: ["5A", "5B"]
        };
        
        onLogin('teacher', teacherData);
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${teacherData.nama}!`,
        });
      } else {
        toast({
          title: "Login Gagal", 
          description: "Periksa kembali email dan password Anda.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
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