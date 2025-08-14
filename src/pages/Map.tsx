import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Navigation,
  Search,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [layersVisible, setLayersVisible] = useState({
    flood: true,
    roads: true,
    safe: true
  });
  const { toast } = useToast();

  const yalaData = {
    center: [101.2804, 6.5409] as [number, number], // Yala province coordinates
    floodAreas: [
      { id: 1, name: 'อำเภอเมืองยะลา', coords: [101.2804, 6.5409] as [number, number], level: 'warning', accessible: true },
      { id: 2, name: 'อำเภอเบตง', coords: [101.3000, 5.7800] as [number, number], level: 'safe', accessible: true },
      { id: 3, name: 'อำเภอบันนังสตา', coords: [101.1900, 6.3200] as [number, number], level: 'danger', accessible: false },
      { id: 4, name: 'อำเภอธารโต', coords: [101.3500, 6.4800] as [number, number], level: 'warning', accessible: true },
      { id: 5, name: 'อำเภอยะรัง', coords: [101.3700, 6.4200] as [number, number], level: 'safe', accessible: true },
      { id: 6, name: 'อำเภอรามัน', coords: [101.4200, 6.3900] as [number, number], level: 'safe', accessible: true },
      { id: 7, name: 'อำเภอกาบัง', coords: [101.4800, 6.4500] as [number, number], level: 'warning', accessible: false },
      { id: 8, name: 'อำเภอกรอกพระ', coords: [101.2200, 6.6200] as [number, number], level: 'danger', accessible: false }
    ],
    routes: [
      { from: 'เมืองยะลา', to: 'เบตง', status: 'open', distance: '95 กม.' },
      { from: 'เมืองยะลา', to: 'ธารโต', status: 'caution', distance: '45 กม.' },
      { from: 'บันนังสตา', to: 'รามัน', status: 'closed', distance: '32 กม.' },
      { from: 'ยะรัง', to: 'กาบัง', status: 'closed', distance: '28 กม.' }
    ]
  };

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = mapboxToken;
      
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: yalaData.center,
        zoom: 10,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.default.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        // Add flood area markers
        yalaData.floodAreas.forEach((area) => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = 
            area.level === 'danger' ? '#ef4444' :
            area.level === 'warning' ? '#f59e0b' : '#10b981';
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '3px solid white';
          el.style.cursor = 'pointer';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';

          new mapboxgl.default.Marker(el)
            .setLngLat(area.coords)
            .setPopup(
              new mapboxgl.default.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-semibold">${area.name}</h3>
                    <p class="text-sm">สถานะ: ${
                      area.level === 'danger' ? 'อันตราย' :
                      area.level === 'warning' ? 'เฝ้าระวัง' : 'ปลอดภัย'
                    }</p>
                    <p class="text-sm">เส้นทาง: ${area.accessible ? 'ผ่านได้' : 'ปิดกั้น'}</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });

        toast({
          title: "โหลดแผนที่สำเร็จ",
          description: "แผนที่จังหวัดยะลาพร้อมใช้งาน",
        });
      });

    } catch (error) {
      toast({
        title: "ไม่สามารถโหลดแผนที่ได้",
        description: "กรุณาตรวจสอบ Mapbox Token",
        variant: "destructive",
      });
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap();
    }
  };

  const toggleLayer = (layer: keyof typeof layersVisible) => {
    setLayersVisible(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  if (showTokenInput) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>ตั้งค่า Mapbox Token</CardTitle>
              <CardDescription>
                กรุณาใส่ Mapbox Public Token เพื่อแสดงแผนที่
                <br />
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  รับ Token ได้ที่ mapbox.com
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="pk.eyJ1..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  โหลดแผนที่
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">แผนที่จังหวัดยะลา</h1>
          <p className="text-muted-foreground">ติดตามสถานการณ์น้ำท่วมและเส้นทางการเดินทาง</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div ref={mapContainer} className="w-full h-full rounded-lg" />
              </CardContent>
            </Card>
          </div>

          {/* Controls and Info */}
          <div className="space-y-6">
            {/* Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5" />
                  <span>การแสดงผล</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">พื้นที่น้ำท่วม</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleLayer('flood')}
                  >
                    {layersVisible.flood ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">เส้นทางการเดินทาง</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleLayer('roads')}
                  >
                    {layersVisible.roads ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">พื้นที่ปลอดภัย</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleLayer('safe')}
                  >
                    {layersVisible.safe ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>สัญลักษณ์</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">พื้นที่อันตราย</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">พื้นที่เฝ้าระวัง</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">พื้นที่ปลอดภัย</span>
                </div>
              </CardContent>
            </Card>

            {/* Route Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>สถานะเส้นทาง</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {yalaData.routes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{route.from} - {route.to}</p>
                      <p className="text-muted-foreground">{route.distance}</p>
                    </div>
                    <Badge 
                      className={
                        route.status === 'open' ? 'bg-flood-safe' :
                        route.status === 'caution' ? 'bg-flood-warning' : 'bg-flood-danger'
                      }
                    >
                      {route.status === 'open' ? 'เปิด' :
                       route.status === 'caution' ? 'ระวัง' : 'ปิด'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>การกระทำด่วน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  รายงานเหตุการณ์
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  ขอความช่วยเหลือ
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  ค้นหาสถานที่
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;