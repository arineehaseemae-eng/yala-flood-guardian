import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaFacebook, FaLine, FaApple } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import yalaHero from '@/assets/yala-hero.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "เข้าสู่ระบบสำเร็จ",
      description: "ยินดีต้อนรับกลับ",
    });
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `เข้าสู่ระบบด้วย ${provider}`,
      description: "กำลังเชื่อมต่อ...",
    });
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${yalaHero})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="card-gradient border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">เข้าสู่ระบบ</CardTitle>
            <CardDescription>
              เข้าสู่ระบบเพื่อติดตามสถานการณ์น้ำท่วมจังหวัดยะลา
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">เข้าสู่ระบบโดย</p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 h-12"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 h-12"
                  onClick={() => handleSocialLogin('Line')}
                >
                  <FaLine className="h-5 w-5 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 h-12"
                  onClick={() => handleSocialLogin('Apple')}
                >
                  <FaApple className="h-5 w-5 text-gray-800" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">หรือ</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                เข้าสู่ระบบ
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                ยังไม่มีบัญชี?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  สมัครสมาชิก
                </Link>
              </p>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline block">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;