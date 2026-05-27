import { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { Sidebar } from './components/Sidebar';
import { ElevationProfile } from './components/ElevationProfile';
import type { LayerState, ExistingProject } from './types';
import { routes, solarZones, windZones, existingProjects, protectedAreas } from './data';
import 'leaflet/dist/leaflet.css';
import './App.css';

const CENTER: [number, number] = [-32.55, 151.15];
const ZOOM = 9;

// Custom project marker icons by type
function getProjectColor(type: ExistingProject['type']): string {
  switch (type) {
    case 'solar': return '#F59E0B';
    case 'wind': return '#38BDF8';
    case 'battery': return '#10B981';
    case 'coal': return '#EF4444';
    case 'hydro': return '#3B82F6';
    default: return '#94A3B8';
  }
}

function getProjectStatusBadge(status: ExistingProject['status']): string {
  switch (status) {
    case 'operational': return 'bg-emerald-500/20 text-emerald-300';
    case 'construction': return 'bg-blue-500/20 text-blue-300';
    case 'planned': return 'bg-amber-500/20 text-amber-300';
    case 'closing': return 'bg-red-500/20 text-red-300';
    default: return 'bg-slate-500/20 text-slate-300';
  }
}

function App() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [layers, setLayers] = useState<LayerState>({
    routeA: true,
    routeB: true,
    routeC: true,
    solarZones: true,
    windZones: true,
    existingProjects: true,
    protectedAreas: true,
    stations: true,
  });

  const handleLayerToggle = useCallback((key: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const activeRouteData = useMemo(() => 
    routes.find(r => r.id === activeRoute),
  [activeRoute]);

  return (
    <div className="flex h-screen w-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeRoute={activeRoute}
        onRouteSelect={setActiveRoute}
        layers={layers}
        onLayerToggle={handleLayerToggle}
        routes={routes}
      />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={CENTER}
          zoom={ZOOM}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
        >
          {/* OpenTopoMap terrain tiles */}
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
            maxZoom={17}
          />

          {/* Route A - Valley Floor */}
          {layers.routeA && (
            <Polyline
              positions={routes[0].coordinates}
              pathOptions={{
                color: routes[0].color,
                weight: (activeRoute === 'A' || hoveredRoute === 'A') ? 6 : 4,
                opacity: activeRoute && activeRoute !== 'A' ? 0.3 : 0.9,
                dashArray: activeRoute && activeRoute !== 'A' ? '5, 8' : undefined,
              }}
              eventHandlers={{
                click: () => setActiveRoute('A'),
                mouseover: () => setHoveredRoute('A'),
                mouseout: () => setHoveredRoute(null),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} className="bg-slate-900 text-slate-100 border-slate-600">
                <div className="text-xs font-medium">{routes[0].name}</div>
                <div className="text-[10px] text-slate-400">{routes[0].philosophy}</div>
              </Tooltip>
            </Polyline>
          )}

          {/* Route B - Ridge Hugging */}
          {layers.routeB && (
            <Polyline
              positions={routes[1].coordinates}
              pathOptions={{
                color: routes[1].color,
                weight: (activeRoute === 'B' || hoveredRoute === 'B') ? 6 : 4,
                opacity: activeRoute && activeRoute !== 'B' ? 0.3 : 0.9,
                dashArray: activeRoute && activeRoute !== 'B' ? '5, 8' : undefined,
              }}
              eventHandlers={{
                click: () => setActiveRoute('B'),
                mouseover: () => setHoveredRoute('B'),
                mouseout: () => setHoveredRoute(null),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} className="bg-slate-900 text-slate-100 border-slate-600">
                <div className="text-xs font-medium">{routes[1].name}</div>
                <div className="text-[10px] text-slate-400">{routes[1].philosophy}</div>
              </Tooltip>
            </Polyline>
          )}

          {/* Route C - Hybrid */}
          {layers.routeC && (
            <Polyline
              positions={routes[2].coordinates}
              pathOptions={{
                color: routes[2].color,
                weight: (activeRoute === 'C' || hoveredRoute === 'C') ? 6 : 4,
                opacity: activeRoute && activeRoute !== 'C' ? 0.3 : 0.9,
                dashArray: activeRoute && activeRoute !== 'C' ? '5, 8' : undefined,
              }}
              eventHandlers={{
                click: () => setActiveRoute('C'),
                mouseover: () => setHoveredRoute('C'),
                mouseout: () => setHoveredRoute(null),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} className="bg-slate-900 text-slate-100 border-slate-600">
                <div className="text-xs font-medium">{routes[2].name}</div>
                <div className="text-[10px] text-slate-400">{routes[2].philosophy}</div>
              </Tooltip>
            </Polyline>
          )}

          {/* Solar Zones */}
          {layers.solarZones && solarZones.map(zone => (
            <Polygon
              key={zone.id}
              positions={zone.polygon}
              pathOptions={{
                fillColor: '#F59E0B',
                fillOpacity: 0.2,
                color: '#F59E0B',
                weight: 1,
                dashArray: '3, 6',
              }}
            >
              <Popup className="custom-popup">
                <div className="bg-slate-900 text-slate-100 p-2 min-w-[200px]">
                  <h3 className="text-sm font-semibold text-amber-400">{zone.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">GHI: {zone.ghi} kWh/m²/day</p>
                  <p className="text-xs text-slate-400">Potential Capacity: {zone.capacity} MW</p>
                  <p className="text-xs text-slate-500 mt-1">High solar suitability: flat terrain, good irradiance</p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Wind Zones */}
          {layers.windZones && windZones.map(zone => (
            <Polygon
              key={zone.id}
              positions={zone.polygon}
              pathOptions={{
                fillColor: '#38BDF8',
                fillOpacity: 0.2,
                color: '#38BDF8',
                weight: 1,
                dashArray: '3, 6',
              }}
            >
              <Popup className="custom-popup">
                <div className="bg-slate-900 text-slate-100 p-2 min-w-[200px]">
                  <h3 className="text-sm font-semibold text-sky-400">{zone.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Avg Wind: {zone.avgWindSpeed} m/s @ 80m</p>
                  <p className="text-xs text-slate-400">Potential Capacity: {zone.capacity} MW</p>
                  <p className="text-xs text-slate-500 mt-1">Exposed ridgeline with consistent westerlies</p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Protected Areas */}
          {layers.protectedAreas && protectedAreas.map(area => (
            <Polygon
              key={area.id}
              positions={area.polygon}
              pathOptions={{
                fillColor: '#10B981',
                fillOpacity: 0.08,
                color: '#10B981',
                weight: 1,
                dashArray: '4, 8',
              }}
            >
              <Popup className="custom-popup">
                <div className="bg-slate-900 text-slate-100 p-2">
                  <h3 className="text-sm font-semibold text-emerald-400">{area.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 capitalize">{area.type.replace('_', ' ')}</p>
                  <p className="text-xs text-red-400 mt-1">⚠ Constrained area - route must avoid</p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Existing Projects */}
          {layers.existingProjects && existingProjects.map(project => (
            <CircleMarker
              key={project.id}
              center={[project.lat, project.lng]}
              radius={project.type === 'coal' ? 8 : 6}
              pathOptions={{
                fillColor: getProjectColor(project.type),
                fillOpacity: 0.8,
                color: '#1E293B',
                weight: 2,
              }}
            >
              <Popup className="custom-popup">
                <div className="bg-slate-900 text-slate-100 p-3 min-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getProjectColor(project.type) }}
                    />
                    <h3 className="text-sm font-semibold">{project.name}</h3>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 capitalize">
                      {project.type}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${getProjectStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Capacity: {project.capacity}</p>
                  <p className="text-xs text-slate-500 mt-1">{project.description}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Station Markers */}
          {layers.stations && routes.filter(route => 
            (route.id === 'A' && layers.routeA) || 
            (route.id === 'B' && layers.routeB) || 
            (route.id === 'C' && layers.routeC)
          ).map(route =>
            route.stations.map(station => (
              <CircleMarker
                key={station.id}
                center={[station.lat, station.lng]}
                radius={station.type === 'major' ? 10 : 7}
                pathOptions={{
                  fillColor: route.color,
                  fillOpacity: activeRoute === route.id ? 0.95 : 0.7,
                  color: '#F8FAFC',
                  weight: 2,
                }}
              >
                <Popup className="custom-popup">
                  <div className="bg-slate-900 text-slate-100 p-3 min-w-[240px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <h3 className="text-sm font-semibold">{station.name}</h3>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 capitalize">
                        {station.type} station
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                        {station.passengerCapacity.toLocaleString()} pax/day
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Energy Integration</p>
                      <ul className="space-y-1">
                        {station.energyFeatures.map((feature, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))
          )}
        </MapContainer>

        {/* Zoom controls override position */}
        <div className="leaflet-control-zoom leaflet-bar leaflet-control absolute top-4 right-4 z-[1000]">
          <a className="leaflet-control-zoom-in leaflet-bar-part leaflet-bar-part-top" href="#" title="Zoom in" role="button" aria-label="Zoom in">+</a>
          <a className="leaflet-control-zoom-out leaflet-bar-part leaflet-bar-part-bottom" href="#" title="Zoom out" role="button" aria-label="Zoom out">−</a>
        </div>

        {/* Legend overlay */}
        <div className="absolute top-4 right-16 z-[1000] bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl max-w-[200px]">
          <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Legend</h3>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded" style={{ backgroundColor: '#10B981' }} />
              <span className="text-[10px] text-slate-300">Route A (Valley)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded" style={{ backgroundColor: '#F59E0B' }} />
              <span className="text-[10px] text-slate-300">Route B (Ridge)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 rounded" style={{ backgroundColor: '#3B82F6' }} />
              <span className="text-[10px] text-slate-300">Route C (Hybrid)</span>
            </div>
            <div className="border-t border-slate-700 my-1 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-amber-400/30 border border-amber-400" />
                <span className="text-[10px] text-slate-300">Solar zone</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-sm bg-sky-400/30 border border-sky-400" />
                <span className="text-[10px] text-slate-300">Wind zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elevation Profile */}
        {activeRouteData && (
          <ElevationProfile
            elevation={activeRouteData.elevation}
            routeColor={activeRouteData.color}
            routeName={activeRouteData.name}
          />
        )}
      </div>
    </div>
  );
}

export default App;
