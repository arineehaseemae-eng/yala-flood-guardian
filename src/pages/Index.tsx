import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFacebook, FaLine, FaApple } from 'react-icons/fa';
import { Droplets, Shield, AlertTriangle, Map } from 'lucide-react';
import yalaHero from '@/assets/yala-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${yalaHero})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-yellow-400 p-4 rounded-2xl shadow-lg">
                <Droplets className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold hero-text mb-6">
              FLOOD YALA
            </h1>
            <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto leading-relaxed">
              แอปพลิเคชันติดตามสถานการณ์น้ำท่วมจังหวัดยะลา ได้รับการแจ้งเตือนเหตุการณ์น้ำท่วมแบบเรียลไทม์ 
              พร้อมระบบขอความช่วยเหลือฉุกเฉิน กับการติดตามระดับน้ำและสภาพอากาศ
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-flood-warning hover:bg-flood-warning/90 text-white font-semibold px-8 py-3 text-lg"
              onClick={() => navigate('/register')}
            >
              สมัครบัญชีผู้ใช้งาน
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30 font-semibold px-8 py-3 text-lg"
              onClick={() => navigate('/login')}
            >
              เข้าสู่ระบบ
            </Button>
          </div>

          {/* Social Login */}
          <Card className="card-gradient border-0 shadow-2xl max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">สมัครบัญชีผู้ใช้โดย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center h-16 bg-white/90 hover:bg-white border-2 border-blue-100"
                  onClick={() => navigate('/register')}
                >
                  <FaFacebook className="h-8 w-8 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center h-16 bg-white/90 hover:bg-white border-2 border-green-100"
                  onClick={() => navigate('/register')}
                >
                  <FaLine className="h-8 w-8 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center h-16 bg-white/90 hover:bg-white border-2 border-gray-100"
                  onClick={() => navigate('/register')}
                >
                  <FaApple className="h-8 w-8 text-gray-800" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Map className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">แผนที่จังหวัดยะลา</h3>
                <p className="text-sm text-muted-foreground">
                  ติดตามสถานการณ์น้ำท่วมแบบเรียลไทม์บนแผนที่
                </p>
              </CardContent>
            </Card>
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-flood-warning" />
                <h3 className="text-lg font-semibold mb-2">ขอความช่วยเหลือ</h3>
                <p className="text-sm text-muted-foreground">
                  ระบบขอความช่วยเหลือฉุกเฉินเมื่อเกิดเหตุการณ์น้ำท่วม
                </p>
              </CardContent>
            </Card>
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-flood-safe" />
                <h3 className="text-lg font-semibold mb-2">สิทธิสวัสดิการ</h3>
                <p className="text-sm text-muted-foreground">
                  ตรวจสอบสิทธิสวัสดิการสำหรับผู้ประสบภัย
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
