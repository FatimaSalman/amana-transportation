'use client';

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  <div className="h-96 w-full rounded-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading map...</p>
    </div>
  </div>
);


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
    // Only run on client side
    if (!isClient || !mapRef.current) return;

    let L: any;

    const initializeMap = async () => {
      try {
        // Dynamically import Leaflet only on client
        L = await import('leaflet');

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize map
        const map = L.map(mapRef.current!).setView([3.1390, 101.6869], 11);

        // Add grayscale tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap, &copy; CartoDB',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        mapInstanceRef.current = map;

        // Now setup the route
        setupRoute(map, L);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    const setupRoute = (map: any, L: any) => {
      // Clear existing markers and polylines
      markersRef.current.forEach(marker => map.removeLayer(marker));
      markersRef.current = [];

      polylinesRef.current.forEach(polyline => map.removeLayer(polyline));
      polylinesRef.current = [];

      // Create array of coordinates for the polyline
      const routeCoordinates = selectedRoute.bus_stops.map((stop: any) =>
        [stop.latitude, stop.longitude] as [number, number]
      );

      // Add the bus current location to the route
      routeCoordinates.unshift([
        selectedRoute.current_location.latitude,
        selectedRoute.current_location.longitude
      ] as [number, number]);

      // Draw the route path
      const routePath = L.polyline(routeCoordinates, {
        color: '#2563EB',
        weight: 4,
        opacity: 0.7,
        dashArray: '5, 10',
        lineJoin: 'round'
      }).addTo(map);

      polylinesRef.current.push(routePath);

      // Custom bus icon
      const busIcon = L.divIcon({
        html: `
          <div style="
            background: #2563EB; 
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="color: white; font-size: 12px; font-weight: bold;">🚌</div>
          </div>
        `,
        className: 'bus-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Bus stop icon
      const createStopIcon = (isNextStop: boolean) => L.divIcon({
        html: `
          <div style="
            background: ${isNextStop ? '#F59E0B' : '#DC2626'}; 
            width: ${isNextStop ? '16px' : '12px'}; 
            height: ${isNextStop ? '16px' : '12px'}; 
            border-radius: 50%; 
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.5);
          "></div>
        `,
        className: 'stop-marker',
        iconSize: isNextStop ? [16, 16] : [12, 12],
        iconAnchor: isNextStop ? [8, 8] : [6, 6],
      });

      // Add bus stops
      selectedRoute.bus_stops.forEach((stop: any, index: number) => {
        const marker = L.marker([stop.latitude, stop.longitude], {
          icon: createStopIcon(stop.is_next_stop)
        })
          .addTo(map)
          .bindPopup(`
            <div class="p-2 min-w-[160px]">
              <h3 class="font-semibold text-gray-900 text-sm">${stop.name}</h3>
              <p class="text-sm text-gray-600 mt-1">Arrival: ${stop.estimated_arrival}</p>
              ${stop.is_next_stop ? '<p class="text-orange-600 text-xs font-medium mt-1">Next Stop</p>' : ''}
              <p class="text-xs text-gray-500 mt-1">Stop ${index + 1} of ${selectedRoute.bus_stops.length}</p>
            </div>
          `);
        markersRef.current.push(marker);

        // Add circle markers
        const stopCircle = L.circleMarker([stop.latitude, stop.longitude], {
          radius: 8,
          fillColor: stop.is_next_stop ? '#F59E0B' : '#DC2626',
          color: 'white',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map);
        markersRef.current.push(stopCircle);
      });

      // Add bus current location
      const busMarker = L.marker(
        [selectedRoute.current_location.latitude, selectedRoute.current_location.longitude],
        { icon: busIcon }
      )
        .addTo(map)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <h3 class="font-semibold text-gray-900">${selectedRoute.route_number}</h3>
            <p class="text-sm text-gray-600">${selectedRoute.name}</p>
            <div class="mt-2 space-y-1 text-sm">
              <p><span class="font-medium">Capacity:</span> ${selectedRoute.passengers.current}/${selectedRoute.passengers.capacity}</p>
              <p><span class="font-medium">Next Stop:</span> ${selectedRoute.bus_stops.find((stop: any) => stop.is_next_stop)?.name || 'N/A'}</p>
              <p><span class="font-medium">Status:</span> <span class="text-green-600">${selectedRoute.status}</span></p>
            </div>
          </div>
        `);
      markersRef.current.push(busMarker);

      // Add area labels
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
            html: `<div class="text-xs font-semibold text-gray-800 bg-white bg-opacity-90 px-2 py-1 rounded border border-gray-300">${area.name}</div>`,
            iconSize: [60, 30],
            className: 'area-label'
          })
        }).addTo(map);
        markersRef.current.push(label);
      });

      // Fit map to show the route
      if (routePath.getBounds().isValid()) {
        map.fitBounds(routePath.getBounds().pad(0.2));
      }
    };

    initializeMap();

    // Cleanup
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
      className="h-96 w-full rounded-lg bg-gray-200 border-2 border-gray-300"
    />
  );
};

export default function HomePage() {
  const [selectedRoute, setSelectedRoute] = useState(busData.bus_lines[0]);
  const [activeBuses] = useState(busData.bus_lines.filter(bus => bus.status === 'Active'));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white p-2 flex justify-between items-center text-sm">
        <span className="opacity-70">Amana Logo</span>
        <span className="opacity-70">Menu</span>
      </header>

      <div className="bg-green-500 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Amana Transportation</h1>
          <p className="text-gray-900 mt-2 text-lg">
            Proudly Servicing Malaysian Bus Riders Since 2019!
          </p>
        </div>
      </div>

      <div className="bg-yellow-100 shadow-sm border-b">
        <div className="text-center py-5">
          <h2 className="text-xl font-bold text-gray-900">Active Bus Map</h2>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Bus Route Selection */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {activeBuses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedRoute(bus)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${selectedRoute.id === bus.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900 text-center">{bus.route_number}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Bus Map Section */}
        {/* <div className="mb-8 bg-white rounded-lg shadow-lg border p-6">
          <MapComponent selectedRoute={selectedRoute} />
        </div> */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Active Bus Map</h2>
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-1">
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
        </div>


        {/* Bus Schedule */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bus Schedule</h2>

          {/* Bus List Display */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeBuses.map((bus) => (
              <div key={bus.id} className="bg-white p-4 rounded-lg border shadow-sm text-center">
                <div className="font-semibold text-gray-900">Bus {bus.id}</div>
                <div className="text-sm text-gray-600 mt-1">{bus.route_number}</div>
                <div className="mt-2">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {bus.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg border overflow-hidden">

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Bus Stop
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Next Time of Arrival
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedRoute.bus_stops.map((stop) => (
                  <tr
                    key={stop.id}
                    className={stop.is_next_stop ? 'bg-orange-50 border-l-4 border-orange-500' : 'hover:bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stop.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {stop.estimated_arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {stop.is_next_stop ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Next Stop
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Upcoming
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; 2024 Amana Transportation. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2">
              Headquarters: {busData.company_info.headquarters}
            </p>
            <p className="text-gray-400 mt-1">
              Founded: {busData.company_info.founded}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}