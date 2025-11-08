'use client';

import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Mock API data
const busData = {
  message: "Amana Transportation bus data retrieved successfully",
  company_info: {
    name: "Amana Transportation",
    founded: "2019",
    headquarters: "Kuala Lumpur, Malaysia",
    industry: "Public Transportation",
    description: "Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions, focused on reliability and passenger comfort."
  },
  bus_lines: [
    {
      id: 1,
      name: "KLCC - Petaling Jaya Express",
      route_number: "B101",
      current_location: {
        latitude: 3.158,
        longitude: 101.711,
        address: "Jalan Ampang, near KLCC Twin Towers, Kuala Lumpur"
      },
      status: "Active",
      passengers: {
        current: 32,
        capacity: 45,
        utilization_percentage: 71
      },
      driver: {
        name: "Ahmad Rahman",
        id: "DRV001",
        shift_start: "06:00",
        shift_end: "18:00"
      },
      bus_stops: [
        {
          id: 1,
          name: "KLCC Station",
          latitude: 3.1578,
          longitude: 101.7114,
          estimated_arrival: "14:20",
          is_next_stop: true
        },
        {
          id: 2,
          name: "Pavilion KL",
          latitude: 3.149,
          longitude: 101.7101,
          estimated_arrival: "14:28",
          is_next_stop: false
        },
        {
          id: 3,
          name: "Mid Valley Megamall",
          latitude: 3.1177,
          longitude: 101.6774,
          estimated_arrival: "14:42",
          is_next_stop: false
        },
        {
          id: 4,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:50",
          is_next_stop: false
        },
        {
          id: 5,
          name: "Universiti Malaya",
          latitude: 3.1204,
          longitude: 101.6535,
          estimated_arrival: "15:05",
          is_next_stop: false
        },
        {
          id: 6,
          name: "Petaling Jaya SS2",
          latitude: 3.1147,
          longitude: 101.624,
          estimated_arrival: "15:18",
          is_next_stop: false
        },
        {
          id: 7,
          name: "1 Utama Shopping Centre",
          latitude: 3.1502,
          longitude: 101.6154,
          estimated_arrival: "15:35",
          is_next_stop: false
        }
      ]
    },
    {
      id: 2,
      name: "Old Town - Mont Kiara Connector",
      route_number: "B205",
      current_location: {
        latitude: 3.139,
        longitude: 101.6869,
        address: "KL Sentral Transportation Hub, Kuala Lumpur"
      },
      status: "Active",
      passengers: {
        current: 28,
        capacity: 40,
        utilization_percentage: 70
      },
      driver: {
        name: "Siti Aminah",
        id: "DRV002",
        shift_start: "05:30",
        shift_end: "17:30"
      },
      bus_stops: [
        {
          id: 1,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:15",
          is_next_stop: false
        },
        {
          id: 2,
          name: "Central Market",
          latitude: 3.1427,
          longitude: 101.6964,
          estimated_arrival: "14:25",
          is_next_stop: true
        },
        {
          id: 3,
          name: "Chinatown",
          latitude: 3.1436,
          longitude: 101.6958,
          estimated_arrival: "14:30",
          is_next_stop: false
        },
        {
          id: 4,
          name: "Titiwangsa LRT",
          latitude: 3.1729,
          longitude: 101.7016,
          estimated_arrival: "14:45",
          is_next_stop: false
        },
        {
          id: 5,
          name: "Mont Kiara",
          latitude: 3.1727,
          longitude: 101.6509,
          estimated_arrival: "15:00",
          is_next_stop: false
        },
        {
          id: 6,
          name: "Sri Hartamas",
          latitude: 3.1653,
          longitude: 101.6493,
          estimated_arrival: "15:10",
          is_next_stop: false
        }
      ]
    },
    {
      id: 3,
      name: "Airport - City Circle",
      route_number: "B350",
      current_location: {
        latitude: 2.7456,
        longitude: 101.7072,
        address: "KLIA Express Station, Sepang, Selangor"
      },
      status: "Active",
      passengers: {
        current: 15,
        capacity: 50,
        utilization_percentage: 30
      },
      driver: {
        name: "Lim Wei Ming",
        id: "DRV003",
        shift_start: "04:00",
        shift_end: "16:00"
      },
      bus_stops: [
        {
          id: 1,
          name: "KLIA Terminal 1",
          latitude: 2.7456,
          longitude: 101.7072,
          estimated_arrival: "14:30",
          is_next_stop: false
        },
        {
          id: 2,
          name: "KLIA Terminal 2",
          latitude: 2.7389,
          longitude: 101.6997,
          estimated_arrival: "14:40",
          is_next_stop: false
        },
        {
          id: 3,
          name: "Putrajaya Central",
          latitude: 2.9264,
          longitude: 101.6964,
          estimated_arrival: "15:10",
          is_next_stop: true
        },
        {
          id: 4,
          name: "Cyberjaya",
          latitude: 2.9213,
          longitude: 101.6543,
          estimated_arrival: "15:25",
          is_next_stop: false
        }
      ]
    },
    {
      id: 4,
      name: "University Express",
      route_number: "B410",
      current_location: {
        latitude: 3.1204,
        longitude: 101.6535,
        address: "Universiti Malaya Main Campus, Kuala Lumpur"
      },
      status: "Maintenance",
      passengers: {
        current: 0,
        capacity: 35,
        utilization_percentage: 0
      },
      driver: {
        name: "Raj Kumar",
        id: "DRV004",
        shift_start: "06:30",
        shift_end: "18:30"
      },
      bus_stops: [
        {
          id: 1,
          name: "Universiti Malaya",
          latitude: 3.1204,
          longitude: 101.6535,
          estimated_arrival: "N/A",
          is_next_stop: false
        },
        {
          id: 2,
          name: "UCSI University",
          latitude: 3.0411,
          longitude: 101.7089,
          estimated_arrival: "N/A",
          is_next_stop: false
        },
        {
          id: 3,
          name: "Taylor's University",
          latitude: 3.0653,
          longitude: 101.6075,
          estimated_arrival: "N/A",
          is_next_stop: false
        }
      ]
    },
    {
      id: 5,
      name: "Shopping District Shuttle",
      route_number: "B520",
      current_location: {
        latitude: 3.149,
        longitude: 101.7101,
        address: "Pavilion Kuala Lumpur, Bukit Bintang"
      },
      status: "Active",
      passengers: {
        current: 42,
        capacity: 45,
        utilization_percentage: 93
      },
      driver: {
        name: "Fatimah Zahra",
        id: "DRV005",
        shift_start: "07:00",
        shift_end: "19:00"
      },
      bus_stops: [
        {
          id: 1,
          name: "Pavilion KL",
          latitude: 3.149,
          longitude: 101.7101,
          estimated_arrival: "14:22",
          is_next_stop: false
        },
        {
          id: 2,
          name: "Lot 10 Shopping Centre",
          latitude: 3.1479,
          longitude: 101.71,
          estimated_arrival: "14:25",
          is_next_stop: true
        },
        {
          id: 3,
          name: "Times Square KL",
          latitude: 3.1427,
          longitude: 101.7105,
          estimated_arrival: "14:32",
          is_next_stop: false
        }
      ]
    }
  ]
};

// Map Placeholder for SSR
const MapPlaceholder = () => (
  <div className="h-96 w-full rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-300 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading interactive map...</p>
    </div>
  </div>
);

// Route Progress Component
const RouteProgress = ({ selectedRoute }: { selectedRoute: any }) => {
  const totalStops = selectedRoute.bus_stops.length;
  const completedStops = selectedRoute.bus_stops.findIndex((stop: any) => stop.is_next_stop);
  const progress = (completedStops / totalStops) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Route Progress</h3>
        <span className="text-sm font-medium text-blue-600">
          {completedStops} of {totalStops} stops completed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Start</span>
        <span>{Math.round(progress)}% Complete</span>
        <span>End</span>
      </div>
    </div>
  );
};

// Quick Stats Component
const QuickStats = ({ selectedRoute }: { selectedRoute: any }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="text-blue-600 text-sm font-medium">Capacity</div>
        <div className="text-2xl font-bold text-gray-900">
          {selectedRoute.passengers.current}/{selectedRoute.passengers.capacity}
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${selectedRoute.passengers.utilization_percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
        <div className="text-green-600 text-sm font-medium">Status</div>
        <div className="text-2xl font-bold text-gray-900">{selectedRoute.status}</div>
        <div className="text-xs text-green-600 mt-2">
          {selectedRoute.status === 'Active' ? '🟢 Operating normally' : '🟡 Under maintenance'}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
        <div className="text-purple-600 text-sm font-medium">Driver</div>
        <div className="text-lg font-semibold text-gray-900 truncate">{selectedRoute.driver.name}</div>
        <div className="text-xs text-purple-600 mt-2">ID: {selectedRoute.driver.id}</div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
        <div className="text-orange-600 text-sm font-medium">Next Stop</div>
        <div className="text-lg font-semibold text-gray-900 truncate">
          {selectedRoute.bus_stops.find((stop: any) => stop.is_next_stop)?.name || 'N/A'}
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Arrival: {selectedRoute.bus_stops.find((stop: any) => stop.is_next_stop)?.estimated_arrival || 'N/A'}
        </div>
      </div>
    </div>
  );
};

// Map Component - Completely client-side only
const MapComponent = ({ selectedRoute }: { selectedRoute: any }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    let L: any;

    const initializeMap = async () => {
      try {
        L = await import('leaflet');

        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const map = L.map(mapRef.current!).setView([3.1390, 101.6869], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap, &copy; CartoDB',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        mapInstanceRef.current = map;
        setupRoute(map, L);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    const setupRoute = (map: any, L: any) => {
      markersRef.current.forEach(marker => map.removeLayer(marker));
      markersRef.current = [];

      polylinesRef.current.forEach(polyline => map.removeLayer(polyline));
      polylinesRef.current = [];

      const routeCoordinates = selectedRoute.bus_stops.map((stop: any) =>
        [stop.latitude, stop.longitude] as [number, number]
      );

      routeCoordinates.unshift([
        selectedRoute.current_location.latitude,
        selectedRoute.current_location.longitude
      ] as [number, number]);

      const routePath = L.polyline(routeCoordinates, {
        color: '#2563EB',
        weight: 4,
        opacity: 0.7,
        dashArray: '5, 10',
        lineJoin: 'round'
      }).addTo(map);

      polylinesRef.current.push(routePath);

      const busIcon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #2563EB, #1D4ED8);
            width: 28px; 
            height: 28px; 
            border-radius: 50%; 
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s infinite;
          ">
            <div style="color: white; font-size: 12px; font-weight: bold;">🚌</div>
          </div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          </style>
        `,
        className: 'bus-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const createStopIcon = (isNextStop: boolean) => L.divIcon({
        html: `
          <div style="
            background: ${isNextStop ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #DC2626, #B91C1C)'}; 
            width: ${isNextStop ? '18px' : '14px'}; 
            height: ${isNextStop ? '18px' : '14px'}; 
            border-radius: 50%; 
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            ${isNextStop ? 'animation: bounce 1.5s infinite;' : ''}
          "></div>
          <style>
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
          </style>
        `,
        className: 'stop-marker',
        iconSize: isNextStop ? [18, 18] : [14, 14],
        iconAnchor: isNextStop ? [9, 9] : [7, 7],
      });

      selectedRoute.bus_stops.forEach((stop: any, index: number) => {
        const marker = L.marker([stop.latitude, stop.longitude], {
          icon: createStopIcon(stop.is_next_stop)
        })
          .addTo(map)
          .bindPopup(`
            <div class="p-3 min-w-[180px]">
              <h3 class="font-bold text-gray-900 text-sm">${stop.name}</h3>
              <p class="text-sm text-gray-600 mt-1">Arrival: <span class="font-semibold">${stop.estimated_arrival}</span></p>
              ${stop.is_next_stop ? '<p class="text-orange-600 text-xs font-medium mt-2 bg-orange-50 px-2 py-1 rounded">📍 Next Stop</p>' : ''}
              <p class="text-xs text-gray-500 mt-2">Stop ${index + 1} of ${selectedRoute.bus_stops.length}</p>
            </div>
          `);
        markersRef.current.push(marker);

        const stopCircle = L.circleMarker([stop.latitude, stop.longitude], {
          radius: stop.is_next_stop ? 10 : 8,
          fillColor: stop.is_next_stop ? '#F59E0B' : '#DC2626',
          color: 'white',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map);
        markersRef.current.push(stopCircle);
      });

      const busMarker = L.marker(
        [selectedRoute.current_location.latitude, selectedRoute.current_location.longitude],
        { icon: busIcon }
      )
        .addTo(map)
        .bindPopup(`
          <div class="p-3 min-w-[220px]">
            <h3 class="font-bold text-gray-900">${selectedRoute.route_number}</h3>
            <p class="text-sm text-gray-600">${selectedRoute.name}</p>
            <div class="mt-3 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="font-medium">Capacity:</span>
                <span>${selectedRoute.passengers.current}/${selectedRoute.passengers.capacity}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Next Stop:</span>
                <span class="text-blue-600">${selectedRoute.bus_stops.find((stop: any) => stop.is_next_stop)?.name || 'N/A'}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Status:</span>
                <span class="text-green-600 font-semibold">${selectedRoute.status}</span>
              </div>
            </div>
          </div>
        `);
      markersRef.current.push(busMarker);

      const areas = [
        { name: "Kuang", lat: 3.25, lng: 101.55 },
        { name: "Kapar", lat: 3.15, lng: 101.45 },
        { name: "Sungai Buloh", lat: 3.22, lng: 101.58 },
        { name: "Petaling Jaya", lat: 3.10, lng: 101.65 },
        { name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
        { name: "Cheras", lat: 3.07, lng: 101.75 },
        { name: "Ampang", lat: 3.15, lng: 101.77 },
        { name: "Bandar Baru Selayang", lat: 3.25, lng: 101.66 }
      ];

      areas.forEach(area => {
        const label = L.marker([area.lat, area.lng], {
          icon: L.divIcon({
            html: `<div class="text-xs font-bold text-gray-800 bg-white bg-opacity-95 px-3 py-2 rounded-lg border border-gray-300 shadow-sm">${area.name}</div>`,
            iconSize: [70, 35],
            className: 'area-label'
          })
        }).addTo(map);
        markersRef.current.push(label);
      });

      if (routePath.getBounds().isValid()) {
        map.fitBounds(routePath.getBounds().pad(0.2));
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedRoute, isClient]);

  if (!isClient) {
    return <MapPlaceholder />;
  }

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-300 shadow-inner"
    />
  );
};

export default function HomePage() {
  const [selectedRoute, setSelectedRoute] = useState(busData.bus_lines[0]);
  const [activeBuses] = useState(busData.bus_lines.filter(bus => bus.status === 'Active'));
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate data refresh
  const refreshData = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2 text-blue-600">
            <span>Back</span>
          </Link>
          <div className="text-xl font-semibold">Amana Logo</div>
          <div className="w-10"> Menu </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Amana Transportation</h1>
          <p className="text-blue-100 text-xl mb-6">
            Proudly Servicing Malaysian Bus Riders Since 2019!
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center mt-6">Select Bus Route</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {activeBuses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedRoute(bus)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${selectedRoute.id === bus.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl ring-4 ring-blue-200'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${bus.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                        }`}></div>
                      <h3 className="font-bold text-2xl text-gray-900">{bus.route_number}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{bus.name}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${bus.status === 'Active'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                        {bus.status}
                      </span>
                      <span className="text-lg font-semibold text-gray-700">
                        {bus.passengers.current}/{bus.passengers.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats Section */}
        <QuickStats selectedRoute={selectedRoute} />

        {/* Route Progress */}
        <div className="mb-8">
          <RouteProgress selectedRoute={selectedRoute} />
        </div>

        {/* Active Bus Map Section */}

        <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-1 mb-12">
          <MapComponent selectedRoute={selectedRoute} />
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                <span>Bus Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow"></div>
                <span>Bus Stops</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow"></div>
                <span>Next Stop</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-blue-500 opacity-70 border border-blue-300"></div>
                <span>Route Path</span>
              </div>
            </div>
          </div>
        </div>


        {/* Bus Schedule */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bus Schedule</h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeBuses.map((bus) => (
                <div key={bus.id} className="text-center group cursor-pointer" onClick={() => setSelectedRoute(bus)}>
                  <div className={`bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl transition-all duration-300 group-hover:shadow-lg ${selectedRoute.id === bus.id ? 'ring-4 ring-blue-300' : ''
                    }`}>
                    <div className="text-2xl mb-2">🚌</div>
                    <div className="font-bold text-gray-900">Bus {bus.id}</div>
                    <div className="text-sm text-gray-600 mt-1">{bus.route_number}</div>
                    <div className="mt-3">
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        {bus.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Stop
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Bus Stop
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Arrival Time
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {selectedRoute.bus_stops.map((stop: any, index: number) => (
                      <tr
                        key={stop.id}
                        className={`transition-all duration-200 ${stop.is_next_stop
                          ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 transform scale-105 shadow-lg'
                          : 'hover:bg-gray-50'
                          }`}
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${stop.is_next_stop
                            ? 'bg-orange-500 text-white animate-pulse'
                            : index === 0
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                            }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">{stop.name}</div>
                          <div className="text-sm text-gray-500 mt-1">Stop #{stop.id}</div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className={`text-xl font-bold ${stop.is_next_stop ? 'text-orange-600' : 'text-gray-700'
                            }`}>
                            {stop.estimated_arrival}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          {stop.is_next_stop ? (
                            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-orange-100 text-orange-800 border border-orange-200">
                              🎯 Next Stop
                            </span>
                          ) : index === 0 ? (
                            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                              ✅ Departure
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
                              ⏳ Upcoming
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Amana Transportation</h3>
              <p className="text-blue-200 leading-relaxed">
                Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions,
                focused on reliability and passenger comfort.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-blue-200">
                <p>📍 {busData.company_info.headquarters}</p>
                <p>📞 +60 3-1234 5678</p>
                <p>✉️ info@amanatransport.com</p>
                <p>🕒 24/7 Customer Service</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="text-blue-200 hover:text-white transition-colors block">All Bus Routes</a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors block">Fares & Tickets</a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors block">Service Updates</a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors block">Contact Support</a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p className="text-blue-300">
              &copy; 2025 Amana Transportation. Proudly serving Malaysia since 2019. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}