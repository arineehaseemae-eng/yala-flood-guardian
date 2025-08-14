import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Clock,
  MapPin,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaterStation {
  id: string;
  name: string;
  location: string;
  currentLevel: number;
  maxLevel: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
  status: 'safe' | 'warning' | 'danger';
  rainfall: number;
  maxRainfall: number;
}

const WaterLevel = () => {
  const [stations, setStations] = useState<WaterStation[]>([
    {
      id: '1',
      name: 'สถานีเมืองยะลา',
      location: 'อำเภอเมืองยะลา',
      currentLevel: 2.4,
      maxLevel: 5.0,
      trend: 'up',
      lastUpdate: '2 นาทีที่แล้ว',
      status: 'safe',
      rainfall: 15.2,
      maxRainfall: 50.0
    },
    {
      id: '2',
      name: 'สถานีเบตง',
      location: 'อำเภอเบตง',
      currentLevel: 1.8,
      maxLevel: 4.5,
      trend: 'stable',
      lastUpdate: '1 นาทีที่แล้ว',
      status: 'safe',
      rainfall: 8.7,
      maxRainfall: 50.0
    },
    {
      id: '3',
      name: 'สถานีบันนังสตา',
      location: 'อำเภอบันนังสตา',
      currentLevel: 4.1,
      maxLevel: 4.5,
      trend: 'up',
      lastUpdate: '30 วินาทีที่แล้ว',
      status: 'danger',
      rainfall: 42.8,
      maxRainfall: 50.0
    },
    {
      id: '4',
      name: 'สถานีธารโต',
      location: 'อำเภอธารโต',
      currentLevel: 3.2,
      maxLevel: 5.2,
      trend: 'up',
      lastUpdate: '1 นาทีที่แล้ว',
      status: 'warning',
      rainfall: 28.5,
      maxRainfall: 50.0
    },
    {
      id: '5',
      name: 'สถานียะรัง',
      location: 'อำเภอยะรัง',
      currentLevel: 1.5,
      maxLevel: 4.8,
      trend: 'down',
      lastUpdate: '3 นาทีที่แล้ว',
      status: 'safe',
      rainfall: 5.3,
      maxRainfall: 50.0
    },
    {
      id: '6',
      name: 'สถานีรามัน',
      location: 'อำเภอรามัน',
      currentLevel: 2.0,
      maxLevel: 4.2,
      trend: 'stable',
      lastUpdate: '2 นาทีที่แล้ว',
      status: 'safe',
      rainfall: 12.1,
      maxRainfall: 50.0
    }
  ]);

  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshData = () => {
    // Simulate real-time data updates
    setStations(prev => prev.map(station => ({
      ...station,
      currentLevel: Math.max(0, station.currentLevel + (Math.random() - 0.5) * 0.2),
      rainfall: Math.max(0, station.rainfall + (Math.random() - 0.5) * 2),
      trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
      lastUpdate: 'เพิ่งอัพเดท',
      status: function() {
        const percentage = this.currentLevel / this.maxLevel;
        return percentage > 0.8 ? 'danger' : percentage > 0.6 ? 'warning' : 'safe';
      }()
    })));
    setLastRefresh(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'danger':
        return <Badge className="bg-flood-danger text-white">อันตราย</Badge>;
      case 'warning':
        return <Badge className="bg-flood-warning text-white">เฝ้าระวัง</Badge>;
      default:
        return <Badge className="bg-flood-safe text-white">ปกติ</Badge>;
    }
  };

  const getTotalStats = () => {
    const total = stations.length;
    const safe = stations.filter(s => s.status === 'safe').length;
    const warning = stations.filter(s => s.status === 'warning').length;
    const danger = stations.filter(s => s.status === 'danger').length;
    const avgLevel = stations.reduce((sum, s) => sum + (s.currentLevel / s.maxLevel), 0) / total * 100;
    const avgRainfall = stations.reduce((sum, s) => sum + s.rainfall, 0) / total;

    return { total, safe, warning, danger, avgLevel, avgRainfall };
  };

  const stats = getTotalStats();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">ระดับน้ำจังหวัดยะลา</h1>
            <p className="text-muted-foreground">
              ติดตามระดับน้ำและปริมาณน้ำฝนแบบเรียลไทม์
            </p>
          </div>
          <Button onClick={refreshData} variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>รีเฟรช</span>
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">สถานีทั้งหมด</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">สถานี</p>
                </div>
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ระดับน้ำเฉลี่ย</p>
                  <p className="text-2xl font-bold">{stats.avgLevel.toFixed(1)}%</p>
                  <Progress value={stats.avgLevel} className="w-full mt-2" />
                </div>
                <TrendingUp className="h-8 w-8 text-flood-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ปริมาณน้ำฝนเฉลี่ย</p>
                  <p className="text-2xl font-bold">{stats.avgRainfall.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">มม./วัน</p>
                </div>
                <div className="h-8 w-8 bg-flood-blue rounded text-white flex items-center justify-center">
                  <Droplets className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">สถานะสถานี</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">ปกติ: {stats.safe}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">เฝ้าระวัง: {stats.warning}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">อันตราย: {stats.danger}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stations List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stations.map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{station.location}</span>
                    </CardDescription>
                  </div>
                  {getStatusBadge(station.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Water Level */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">ระดับน้ำ</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(station.trend)}
                      <span className="text-sm font-bold">
                        {station.currentLevel.toFixed(1)} / {station.maxLevel.toFixed(1)} ม.
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={(station.currentLevel / station.maxLevel) * 100} 
                    className="w-full"
                  />
                </div>

                {/* Rainfall */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">ปริมาณน้ำฝนจังหวัดยะลา</span>
                    <span className="text-sm font-bold">
                      {station.rainfall.toFixed(1)} / {station.maxRainfall.toFixed(1)} มม.
                    </span>
                  </div>
                  <Progress 
                    value={(station.rainfall / station.maxRainfall) * 100} 
                    className="w-full"
                  />
                </div>

                {/* Last Update */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>อัพเดทล่าสุด: {station.lastUpdate}</span>
                  </div>
                  {station.status === 'danger' && (
                    <div className="flex items-center space-x-1 text-red-500">
                      <AlertTriangle className="h-3 w-3" />
                      <span>ต้องระวัง!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Last Refresh Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>ข้อมูลอัพเดทล่าสุด: {lastRefresh.toLocaleTimeString('th-TH')}</p>
          <p>ข้อมูลจะอัพเดทอัตโนมัติทุก 30 วินาที</p>
        </div>
      </div>
    </Layout>
  );
};

export default WaterLevel;