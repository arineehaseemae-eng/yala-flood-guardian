import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Lock, 
  Info,
  Edit3,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Smartphone,
  Volume2,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'นายสมชาย ใจดี',
    email: 'somchai@email.com',
    phone: '081-234-5678',
    address: '123/45 หมู่ 2 ตำบลสะเตง อำเภอเมือง จังหวัดยะลา 95000',
    birthDate: '1985-05-15',
    citizenId: '1959900123456'
  });

  const [notifications, setNotifications] = useState({
    floodAlert: true,
    weatherUpdate: true,
    emergencyAlert: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลส่วนตัวของท่านได้รับการอัพเดทแล้ว",
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    const wasEnabled = notifications[type];
    toast({
      title: "ตั้งค่าการแจ้งเตือน",
      description: `${wasEnabled ? 'ปิด' : 'เปิด'}การแจ้งเตือน${
        type === 'floodAlert' ? 'น้ำท่วม' :
        type === 'weatherUpdate' ? 'สภาพอากาศ' : 'เหตุฉุกเฉิน'
      }แล้ว`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const maskCitizenId = (id: string) => {
    return `${id.slice(0, 1)}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${id.slice(12)}`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">ข้อมูลส่วนตัว</h1>
          <p className="text-muted-foreground">
            จัดการข้อมูลส่วนตัวและการตั้งค่าแอปพลิเคชัน
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="notifications">การตั้งค่าการแจ้งเตือน</TabsTrigger>
            <TabsTrigger value="about">เกี่ยวกับแอพพลิเคชัน</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {userInfo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                      <CardDescription>ผู้ใช้ FLOOD YALA</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">ชื่อ - นามสกุล</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="citizenId">เลขบัตรประชาชน</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="citizenId"
                        value={maskCitizenId(userInfo.citizenId)}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">อีเมล</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">หมายเลขโทรศัพท์</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="birthDate">วันเกิด</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={userInfo.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">ที่อยู่</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={userInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      ยกเลิก
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      บันทึก
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>ความปลอดภัย</span>
                </CardTitle>
                <CardDescription>
                  จัดการรหัสผ่านและการตั้งค่าความปลอดภัย
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  เปลี่ยนรหัสผ่าน
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  การยืนยันตัวตนแบบ 2 ขั้นตอน
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>การตั้งค่าการแจ้งเตือน</span>
                </CardTitle>
                <CardDescription>
                  เลือกประเภทการแจ้งเตือนที่ต้องการรับ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Bell className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">การแจ้งเตือนน้ำท่วม</h3>
                        <p className="text-sm text-muted-foreground">
                          รับการแจ้งเตือนเมื่อมีการเปลี่ยนแปลงระดับน้ำ
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.floodAlert}
                      onCheckedChange={() => handleNotificationChange('floodAlert')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Volume2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">อัพเดทสภาพอากาศ</h3>
                        <p className="text-sm text-muted-foreground">
                          รับข้อมูลสภาพอากาศและการพยากรณ์อากาศ
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.weatherUpdate}
                      onCheckedChange={() => handleNotificationChange('weatherUpdate')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">การแจ้งเตือนฉุกเฉิน</h3>
                        <p className="text-sm text-muted-foreground">
                          รับการแจ้งเตือนเหตุการณ์ฉุกเฉินและภัยพิบัติ
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emergencyAlert}
                      onCheckedChange={() => handleNotificationChange('emergencyAlert')}
                    />
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">หมายเหตุ</h4>
                  <p className="text-sm text-muted-foreground">
                    การแจ้งเตือนฉุกเฉินไม่สามารถปิดได้เพื่อความปลอดภัย
                    คุณจะได้รับการแจ้งเตือนผ่านทาง SMS และ Push Notification
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>เกี่ยวกับแอพพลิเคชัน</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="bg-yellow-400 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">💧</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">FLOOD YALA</h2>
                    <p className="text-muted-foreground">เวอร์ชัน 1.0.0</p>
                  </div>
                  <p className="text-center max-w-md mx-auto">
                    แอปพลิเคชันติดตามสถานการณ์น้ำท่วมจังหวัดยะลา 
                    พัฒนาเพื่อความปลอดภัยของประชาชน
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">พัฒนาโดยทีม</span>
                    <span className="font-medium">ลอลอคอคอ</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">อัพเดทล่าสุด</span>
                    <span className="font-medium">14 สิงหาคม 2568</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">ขนาดแอป</span>
                    <span className="font-medium">24.5 MB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">เวอร์ชัน API</span>
                    <span className="font-medium">v2.1</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">ฟีเจอร์หลัก</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• ติดตามระดับน้ำแบบเรียลไทม์</li>
                    <li>• แผนที่พื้นที่เสี่ยงน้ำท่วม</li>
                    <li>• ระบบขอความช่วยเหลือฉุกเฉิน</li>
                    <li>• ตรวจสอบสิทธิสวัสดิการ</li>
                    <li>• การแจ้งเตือนอัตโนมัติ</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">ติดต่อเรา</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>อีเมล:</strong> support@floodyala.go.th</p>
                    <p><strong>โทรศัพท์:</strong> 073-xxx-xxxx</p>
                    <p><strong>เว็บไซต์:</strong> www.floodyala.go.th</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    © 2024 สำนักงานป้องกันและบรรเทาสาธารณภัยจังหวัดยะลา
                    <br />
                    สงวนลิขสิทธิ์ทุกประการ
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;