import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gift, 
  CreditCard, 
  Home, 
  GraduationCap,
  Heart,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WelfareProgram {
  id: string;
  name: string;
  description: string;
  amount: number;
  duration: string;
  eligibility: string[];
  status: 'available' | 'pending' | 'closed';
  applicants: number;
  maxApplicants: number;
  icon: any;
  category: string;
}

const Welfare = () => {
  const [citizenId, setCitizenId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const welfarePrograms: WelfareProgram[] = [
    {
      id: '1',
      name: 'เงินช่วยเหลือผู้ประสบภัยน้ำท่วม',
      description: 'เงินช่วยเหลือเยียวยาครัวเรือนที่ได้รับผลกระทบจากน้ำท่วม',
      amount: 15000,
      duration: 'ครั้งเดียว',
      eligibility: [
        'เป็นผู้อยู่ในพื้นที่ประกาศภัยพิบัติ',
        'บ้านได้รับความเสียหายจากน้ำท่วม',
        'มีรายได้ต่อเดือนไม่เกิน 30,000 บาท'
      ],
      status: 'available',
      applicants: 234,
      maxApplicants: 1000,
      icon: CreditCard,
      category: 'emergency'
    },
    {
      id: '2',
      name: 'โครงการซ่อมแซมที่อยู่อาศัย',
      description: 'สนับสนุนการซ่อมแซมบ้านที่ได้รับความเสียหาย',
      amount: 50000,
      duration: 'สูงสุด 6 เดือน',
      eligibility: [
        'เป็นเจ้าของบ้านที่ถูกกฎหมาย',
        'บ้านได้รับความเสียหายระดับปานกลางขึ้นไป',
        'ไม่เคยรับการสนับสนุนประเภทนี้มาก่อน'
      ],
      status: 'available',
      applicants: 89,
      maxApplicants: 500,
      icon: Home,
      category: 'housing'
    },
    {
      id: '3',
      name: 'ทุนการศึกษาเด็กผู้ประสบภัย',
      description: 'ทุนการศึกษาสำหรับเด็กในครัวเรือนผู้ประสบภัย',
      amount: 10000,
      duration: 'ต่อปีการศึกษา',
      eligibility: [
        'เป็นนักเรียน/นักศึกษาในจังหวัดยะลา',
        'ครอบครัวได้รับผลกระทบจากน้ำท่วม',
        'มีผลการเรียนเฉลี่ย 2.50 ขึ้นไป'
      ],
      status: 'available',
      applicants: 156,
      maxApplicants: 300,
      icon: GraduationCap,
      category: 'education'
    },
    {
      id: '4',
      name: 'สวัสดิการรักษาพยาบาลฟรี',
      description: 'การรักษาพยาบาลฟรีสำหรับผู้ประสบภัย',
      amount: 0,
      duration: '3 เดือน',
      eligibility: [
        'เป็นผู้ประสบภัยน้ำท่วมในจังหวัดยะลา',
        'มีบัตรประชาชนหรือหลักฐานการพำนัก',
        'ได้รับการรับรองจากหน่วยงานท้องถิ่น'
      ],
      status: 'available',
      applicants: 445,
      maxApplicants: 1500,
      icon: Heart,
      category: 'health'
    },
    {
      id: '5',
      name: 'โครงการฟื้นฟูอาชีพ',
      description: 'อบรมทักษะและสนับสนุนการประกอบอาชีพใหม่',
      amount: 25000,
      duration: '6 เดือน',
      eligibility: [
        'สูญเสียอาชีพเดิมจากน้ำท่วม',
        'อายุ 18-60 ปี',
        'พร้อมเข้าร่วมการอบรม'
      ],
      status: 'pending',
      applicants: 67,
      maxApplicants: 200,
      icon: Users,
      category: 'career'
    }
  ];

  const userApplications = [
    {
      id: 'APP001',
      programName: 'เงินช่วยเหลือผู้ประสบภัยน้ำท่วม',
      status: 'approved',
      amount: 15000,
      appliedDate: '2024-08-10',
      approvedDate: '2024-08-12'
    },
    {
      id: 'APP002',
      programName: 'ทุนการศึกษาเด็กผู้ประสบภัย',
      status: 'pending',
      amount: 10000,
      appliedDate: '2024-08-13',
      approvedDate: null
    }
  ];

  const searchCitizenData = async () => {
    if (!citizenId || citizenId.length !== 13) {
      toast({
        title: "กรุณาใส่เลขบัตรประชาชน",
        description: "เลขบัตรประชาชนต้องมี 13 หลัก",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSearchResult({
      name: 'นายสมชาย ใจดี',
      address: '123/45 หมู่ 2 ตำบลสะเตง อำเภอเมือง จังหวัดยะลา 95000',
      eligiblePrograms: ['1', '2', '4'],
      appliedPrograms: ['1', '2'],
      status: 'eligible'
    });
    
    setIsSearching(false);
    toast({
      title: "ตรวจสอบสิทธิ์สำเร็จ",
      description: "พบข้อมูลการขอรับสวัสดิการของท่าน",
    });
  };

  const applyForProgram = (programId: string) => {
    toast({
      title: "ส่งใบสมัครสำเร็จ",
      description: "ระบบจะแจ้งผลการพิจารณาภายใน 7-14 วันทำการ",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'อนุมัติ';
      case 'rejected':
        return 'ไม่อนุมัติ';
      default:
        return 'รอพิจารณา';
    }
  };

  const getCategoryPrograms = (category: string) => {
    return welfarePrograms.filter(program => program.category === category);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">สิทธิสวัสดิการ</h1>
          <p className="text-muted-foreground">
            ตรวจสอบสิทธิและสมัครรับสวัสดิการสำหรับผู้ประสบภัยน้ำท่วม
          </p>
        </div>

        <Tabs defaultValue="check" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="check">ตรวจสอบสิทธิ์</TabsTrigger>
            <TabsTrigger value="programs">โครงการสวัสดิการ</TabsTrigger>
            <TabsTrigger value="status">สถานะการสมัคร</TabsTrigger>
          </TabsList>

          {/* Check Eligibility */}
          <TabsContent value="check" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>ตรวจสอบสิทธิการรับสวัสดิการ</span>
                </CardTitle>
                <CardDescription>
                  กรุณาใส่เลขบัตรประชาชนเพื่อตรวจสอบสิทธิ์
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="citizenId">เลขบัตรประชาชน (13 หลัก)</Label>
                    <Input
                      id="citizenId"
                      type="text"
                      placeholder="X-XXXX-XXXXX-XX-X"
                      value={citizenId}
                      onChange={(e) => setCitizenId(e.target.value.replace(/\D/g, '').slice(0, 13))}
                      maxLength={13}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={searchCitizenData}
                      disabled={isSearching || citizenId.length !== 13}
                    >
                      {isSearching ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>ตรวจสอบ...</span>
                        </div>
                      ) : (
                        'ตรวจสอบ'
                      )}
                    </Button>
                  </div>
                </div>

                {searchResult && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">ผลการตรวจสอบ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p><strong>ชื่อ:</strong> {searchResult.name}</p>
                        <p><strong>ที่อยู่:</strong> {searchResult.address}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">โครงการที่มีสิทธิ์สมัคร:</h4>
                        <div className="space-y-2">
                          {welfarePrograms
                            .filter(program => searchResult.eligiblePrograms.includes(program.id))
                            .map(program => (
                              <div key={program.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <program.icon className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">{program.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {program.amount > 0 ? `${program.amount.toLocaleString()} บาท` : 'ฟรี'} - {program.duration}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {searchResult.appliedPrograms.includes(program.id) ? (
                                    <Badge className="bg-yellow-500">สมัครแล้ว</Badge>
                                  ) : (
                                    <Button 
                                      size="sm"
                                      onClick={() => applyForProgram(program.id)}
                                    >
                                      สมัคร
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Welfare Programs */}
          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {welfarePrograms.map((program) => {
                const Icon = program.icon;
                return (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Icon className="h-8 w-8 text-primary" />
                        <Badge 
                          className={
                            program.status === 'available' ? 'bg-flood-safe' :
                            program.status === 'pending' ? 'bg-flood-warning' : 'bg-flood-danger'
                          }
                        >
                          {program.status === 'available' ? 'เปิดรับสมัคร' :
                           program.status === 'pending' ? 'รอเปิดรับ' : 'ปิดรับสมัคร'}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">จำนวนเงิน:</span>
                          <span className="font-semibold">
                            {program.amount > 0 ? `${program.amount.toLocaleString()} บาท` : 'ฟรี'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">ระยะเวลา:</span>
                          <span className="font-semibold">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">ผู้สมัคร:</span>
                          <span className="font-semibold">
                            {program.applicants}/{program.maxApplicants} คน
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">เงื่อนไขการสมัคร:</h4>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                          {program.eligibility.map((condition, index) => (
                            <li key={index}>{condition}</li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className="w-full" 
                        disabled={program.status !== 'available'}
                        onClick={() => applyForProgram(program.id)}
                      >
                        {program.status === 'available' ? 'สมัครเลย' : 'ไม่สามารถสมัครได้'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Application Status */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>สถานะการสมัครของฉัน</span>
                </CardTitle>
                <CardDescription>
                  ติดตามความคืบหน้าการสมัครสวัสดิการ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userApplications.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{application.programName}</h3>
                          <p className="text-sm text-muted-foreground">
                            รหัสใบสมัคร: {application.id}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <Badge 
                            className={
                              application.status === 'approved' ? 'bg-flood-safe' :
                              application.status === 'rejected' ? 'bg-flood-danger' : 'bg-flood-warning'
                            }
                          >
                            {getStatusText(application.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">จำนวนเงิน:</span>
                          <p className="font-semibold">{application.amount.toLocaleString()} บาท</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">วันที่สมัคร:</span>
                          <p>{new Date(application.appliedDate).toLocaleDateString('th-TH')}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">วันที่อนุมัติ:</span>
                          <p>{application.approvedDate ? new Date(application.approvedDate).toLocaleDateString('th-TH') : '-'}</p>
                        </div>
                      </div>

                      {application.status === 'approved' && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            ดาวน์โหลดหนังสือรับรอง
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            ดูรายละเอียด
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Welfare;