import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  Users,
  Shield,
  Heart,
  Truck,
  Home,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: string;
  available: boolean;
  icon: any;
}

const Help = () => {
  const [formData, setFormData] = useState({
    urgency: '',
    type: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    peopleCount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'กู้ภัยจังหวัดยะลา',
      phone: '1669',
      type: 'emergency',
      available: true,
      icon: AlertTriangle
    },
    {
      id: '2',
      name: 'ตำรวจจังหวัดยะลา',
      phone: '191',
      type: 'police',
      available: true,
      icon: Shield
    },
    {
      id: '3',
      name: 'โรงพยาบาลยะลา',
      phone: '073-212-034',
      type: 'medical',
      available: true,
      icon: Heart
    },
    {
      id: '4',
      name: 'กรมป้องกันน้ำท่วม',
      phone: '073-245-123',
      type: 'flood',
      available: true,
      icon: Truck
    },
    {
      id: '5',
      name: 'สำนักงานป้องกันภัย',
      phone: '073-287-456',
      type: 'disaster',
      available: true,
      icon: Home
    },
    {
      id: '6',
      name: 'การไฟฟ้าส่วนภูมิภาค',
      phone: '073-234-789',
      type: 'utilities',
      available: false,
      icon: Zap
    }
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'วิกฤติ - ต้องการความช่วยเหลือทันที', color: 'bg-red-500' },
    { value: 'urgent', label: 'เร่งด่วน - ต้องการความช่วยเหลือใน 1-2 ชั่วโมง', color: 'bg-orange-500' },
    { value: 'moderate', label: 'ปานกลาง - ต้องการความช่วยเหลือภายใน 24 ชั่วโมง', color: 'bg-yellow-500' },
    { value: 'low', label: 'ไม่เร่งด่วน - สามารถรอได้', color: 'bg-green-500' }
  ];

  const helpTypes = [
    'อพยพออกจากพื้นที่น้ำท่วม',
    'ขอน้ำดื่มและอาหาร',
    'ขอยารักษาโรค',
    'ซ่อมแซมที่อยู่อาศัย',
    'ขอเรือหรือยานพาหนะ',
    'ช่วยเหลือผู้สูงอายุ/เด็ก',
    'ขอความช่วยเหลือทางการเงิน',
    'อื่นๆ'
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "ส่งคำขอความช่วยเหลือสำเร็จ",
      description: "เจ้าหน้าที่จะติดต่อกลับภายใน 15 นาที",
    });

    // Reset form
    setFormData({
      urgency: '',
      type: '',
      location: '',
      description: '',
      contactName: '',
      contactPhone: '',
      peopleCount: ''
    });
    setIsSubmitting(false);
  };

  const callEmergency = (phone: string, name: string) => {
    if (phone.startsWith('0') || phone.length > 4) {
      window.location.href = `tel:${phone}`;
    } else {
      window.location.href = `tel:${phone}`;
    }
    toast({
      title: `กำลังโทรหา ${name}`,
      description: `หมายเลข: ${phone}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-red-600">ขอความช่วยเหลือฉุกเฉิน</h1>
          <p className="text-muted-foreground">
            ระบบขอความช่วยเหลือสำหรับผู้ประสบภัยน้ำท่วมจังหวัดยะลา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Phone className="h-5 w-5" />
                  <span>หมายเลขฉุกเฉิน</span>
                </CardTitle>
                <CardDescription>
                  กดเพื่อโทรติดต่อหน่วยงานที่เกี่ยวข้อง
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <div
                      key={contact.id}
                      className={`p-3 border rounded-lg transition-all ${
                        contact.available 
                          ? 'hover:bg-muted cursor-pointer border-border' 
                          : 'opacity-50 border-muted'
                      }`}
                      onClick={() => contact.available && callEmergency(contact.phone, contact.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium text-sm">{contact.name}</p>
                            <p className="text-lg font-bold text-red-600">{contact.phone}</p>
                          </div>
                        </div>
                        <Badge 
                          className={contact.available ? 'bg-green-500' : 'bg-gray-500'}
                        >
                          {contact.available ? 'พร้อม' : 'ไม่พร้อม'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 text-sm">สำคัญ!</p>
                      <p className="text-red-700 text-xs">
                        หากเป็นเหตุฉุกเฉินที่คุกคามชีวิต โปรดโทร 1669 ทันที
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>แบบฟอร์มขอความช่วยเหลือ</span>
                </CardTitle>
                <CardDescription>
                  กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้เจ้าหน้าที่สามารถช่วยเหลือได้อย่างรวดเร็ว
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Urgency Level */}
                  <div>
                    <Label htmlFor="urgency">ระดับความเร่งด่วน *</Label>
                    <Select 
                      value={formData.urgency} 
                      onValueChange={(value) => handleInputChange('urgency', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="เลือกระดับความเร่งด่วน" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <span>{level.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Help Type */}
                  <div>
                    <Label htmlFor="type">ประเภทความช่วยเหลือ *</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleInputChange('type', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="เลือกประเภทความช่วยเหลือ" />
                      </SelectTrigger>
                      <SelectContent>
                        {helpTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">ที่อยู่/สถานที่เกิดเหตุ *</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="เช่น บ้านเลขที่ 123 หมู่ 5 ตำบล... อำเภอ... จังหวัดยะลา"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* People Count */}
                  <div>
                    <Label htmlFor="peopleCount">จำนวนผู้ต้องการความช่วยเหลือ</Label>
                    <Input
                      id="peopleCount"
                      type="number"
                      placeholder="เช่น 4 คน"
                      value={formData.peopleCount}
                      onChange={(e) => handleInputChange('peopleCount', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">ชื่อผู้ติดต่อ *</Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="ชื่อ-นามสกุล"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">หมายเลขโทรศัพท์ *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="08X-XXX-XXXX"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">รายละเอียดเพิ่มเติม</Label>
                    <Textarea
                      id="description"
                      placeholder="อธิบายสถานการณ์ ความต้องการ หรือข้อมูลเพิ่มเติมที่จำเป็น..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.urgency || !formData.type || !formData.location || !formData.contactName || !formData.contactPhone}
                      className="bg-red-600 hover:bg-red-700 text-white px-8"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>กำลังส่ง...</span>
                        </div>
                      ) : (
                        'ส่งคำขอความช่วยเหลือ'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-amber-600">คำแนะนำด้านความปลอดภัย</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold">เมื่อเกิดน้ำท่วม:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>หาที่สูงไว้ก่อน</li>
                      <li>ปิดไฟฟ้าหลักทันที</li>
                      <li>เตรียมน้ำดื่มและอาหารแห้ง</li>
                      <li>หากติดคาไม่สามารถออกได้ให้โทรขอความช่วยเหลือ</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">สิ่งที่ควรเตรียมไว้:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>ไฟฉายและถ่านไฟฉาย</li>
                      <li>วิทยุแบบพกพา</li>
                      <li>ชุดปฐมพยาบาล</li>
                      <li>โทรศัพท์มือถือและที่ชาร์จ</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;