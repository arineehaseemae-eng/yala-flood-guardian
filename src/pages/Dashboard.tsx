import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  MapPin,
  Users,
  Clock,
  Thermometer
} from 'lucide-react';
import yalaHero from '@/assets/yala-hero.jpg';

const Dashboard = () => {
  const stats = [
    {
      title: 'ระดับน้ำปัจจุบัน',
      value: '2.4 ม.',
      status: 'ปกติ',
      statusColor: 'bg-flood-safe',
      icon: Droplets,
      change: '+0.1 ม.'
    },
    {
      title: 'พื้นที่เสี่ยง',
      value: '3',
      status: 'ติดตาม',
      statusColor: 'bg-flood-warning',
      icon: AlertTriangle,
      change: 'เพิ่ม 1 พื้นที่'
    },
    {
      title: 'ผู้ใช้งานออนไลน์',
      value: '1,247',
      status: 'ออนไลน์',
      statusColor: 'bg-primary',
      icon: Users,
      change: '+23 คน'
    },
    {
      title: 'อุณหภูมิ',
      value: '28°C',
      status: 'ปกติ',
      statusColor: 'bg-flood-green',
      icon: Thermometer,
      change: '+2°C'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'พื้นที่อำเภอเมืองยะลา มีแนวโน้มระดับน้ำสูงขึ้น',
      time: '10 นาทีที่แล้ว',
      location: 'อำเภอเมืองยะลา'
    },
    {
      id: 2,
      type: 'info',
      message: 'การอัพเดทข้อมูลระบบเสร็จสิ้น',
      time: '1 ชั่วโมงที่แล้ว',
      location: 'ระบบ'
    },
    {
      id: 3,
      type: 'success',
      message: 'พื้นที่อำเภอรามัน สถานการณ์กลับสู่ปกติ',
      time: '2 ชั่วโมงที่แล้ว',
      location: 'อำเภอรามัน'
    }
  ];

  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div 
          className="relative h-80 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${yalaHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold hero-text mb-4">
                FLOOD YALA
              </h1>
              <p className="text-xl md:text-2xl hero-text mb-6 max-w-3xl mx-auto px-4">
                แอปพลิเคชันติดตามสถานการณ์น้ำท่วมจังหวัดยะลา ได้รับการแจ้งเตือนเหตุการณ์น้ำท่วมแบบเรียลไทม์ 
                พร้อมระบบขอความช่วยเหลือฉุกเฉิน กับการติดตามระดับน้ำและสภาพอากาศ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-flood-warning hover:bg-flood-warning/90 text-white font-semibold px-8">
                  ดูแผนที่สถานการณ์
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30 font-semibold px-8">
                  ขอความช่วยเหลือ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-gradient border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`${stat.statusColor} text-white`}>
                        {stat.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
            {/* Alerts */}
            <div className="lg:col-span-2">
              <Card className="card-gradient border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>การแจ้งเตือนล่าสุด</span>
                  </CardTitle>
                  <CardDescription>
                    ติดตามสถานการณ์และข่าวสารสำคัญ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-flood-warning' :
                        alert.type === 'info' ? 'bg-primary' : 'bg-flood-safe'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{alert.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="card-gradient border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>เมนูหลัก</CardTitle>
                  <CardDescription>
                    เข้าถึงฟีเจอร์สำคัญได้อย่างรวดเร็ว
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <MapPin className="h-4 w-4 mr-2" />
                    ดูแผนที่จังหวัดยะลา
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Droplets className="h-4 w-4 mr-2" />
                    ตรวจสอบระดับน้ำ
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    ขอความช่วยเหลือ
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    สิทธิสวัสดิการ
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    รายงานสถิติ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;