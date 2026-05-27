import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import type { LayerState, Route } from '@/types';
import { Map, Zap, Wind, Sun, Mountain, CircleDot, ChevronRight, ChevronLeft, Route as RouteIcon } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeRoute: string | null;
  onRouteSelect: (routeId: string | null) => void;
  layers: LayerState;
  onLayerToggle: (key: keyof LayerState) => void;
  routes: Route[];
}

function AnimatedMetric({ value, decimals = 0, unit = '' }: { value: number; decimals?: number; unit?: string }) {
  const animated = useAnimatedNumber(value, 800, decimals);
  return <span>{animated}{unit}</span>;
}

export function Sidebar({ activeRoute, onRouteSelect, layers, onLayerToggle, routes }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const activeRouteData = routes.find(r => r.id === activeRoute);

  if (collapsed) {
    return (
      <div className="w-12 h-full bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 gap-4">
        <button onClick={() => setCollapsed(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">C</div>
      </div>
    );
  }

  return (
    <div className="w-[380px] h-full bg-slate-900 border-r border-slate-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-400" />
            <h1 className="text-sm font-semibold text-slate-100">HSR Route Planner</h1>
          </div>
          <button onClick={() => setCollapsed(true)} className="p-1 hover:bg-slate-800 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1">Hunter Valley, NSW — Sustainable HSR Planning</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Route Selection */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <RouteIcon className="w-3.5 h-3.5" /> Route Selection
          </h2>
          <div className="space-y-2">
            {routes.map(route => (
              <Card
                key={route.id}
                className={`p-3 cursor-pointer transition-all border-2 ${
                  activeRoute === route.id
                    ? 'border-' + (route.id === 'A' ? 'emerald' : route.id === 'B' ? 'amber' : 'blue') + '-500 bg-slate-800'
                    : 'border-transparent bg-slate-800/50 hover:bg-slate-800'
                }`}
                onClick={() => onRouteSelect(activeRoute === route.id ? null : route.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-100">{route.name}</span>
                      {activeRoute === route.id && (
                        <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-400">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{route.philosophy}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Layer Controls */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CircleDot className="w-3.5 h-3.5" /> Map Layers
          </h2>
          <div className="space-y-2.5">
            <LayerToggle
              label="Route A (Valley)"
              icon={<div className="w-3 h-3 rounded-full bg-emerald-500" />}
              checked={layers.routeA}
              onChange={() => onLayerToggle('routeA')}
            />
            <LayerToggle
              label="Route B (Ridge)"
              icon={<div className="w-3 h-3 rounded-full bg-amber-500" />}
              checked={layers.routeB}
              onChange={() => onLayerToggle('routeB')}
            />
            <LayerToggle
              label="Route C (Hybrid)"
              icon={<div className="w-3 h-3 rounded-full bg-blue-500" />}
              checked={layers.routeC}
              onChange={() => onLayerToggle('routeC')}
            />
            <Separator className="bg-slate-700 my-1" />
            <LayerToggle
              label="Solar Potential Zones"
              icon={<Sun className="w-3.5 h-3.5 text-amber-400" />}
              checked={layers.solarZones}
              onChange={() => onLayerToggle('solarZones')}
            />
            <LayerToggle
              label="Wind Resource Zones"
              icon={<Wind className="w-3.5 h-3.5 text-sky-400" />}
              checked={layers.windZones}
              onChange={() => onLayerToggle('windZones')}
            />
            <LayerToggle
              label="Existing Installations"
              icon={<Zap className="w-3.5 h-3.5 text-yellow-400" />}
              checked={layers.existingProjects}
              onChange={() => onLayerToggle('existingProjects')}
            />
            <LayerToggle
              label="Station Markers"
              icon={<Mountain className="w-3.5 h-3.5 text-purple-400" />}
              checked={layers.stations}
              onChange={() => onLayerToggle('stations')}
            />
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Dashboard Metrics */}
        {activeRouteData && (
          <div className="p-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Route Metrics: {activeRouteData.id}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <MetricCard
                label="Length"
                value={<AnimatedMetric value={activeRouteData.metrics.length} decimals={0} unit=" km" />}
                color="text-blue-400"
              />
              <MetricCard
                label="Solar Yield"
                value={<AnimatedMetric value={activeRouteData.metrics.solarYield} decimals={0} unit=" GWh/yr" />}
                color="text-amber-400"
              />
              <MetricCard
                label="Wind Yield"
                value={<AnimatedMetric value={activeRouteData.metrics.windYield} decimals={0} unit=" GWh/yr" />}
                color="text-sky-400"
              />
              <MetricCard
                label="Tunnel/Bridge"
                value={<AnimatedMetric value={activeRouteData.metrics.tunnelBridgePercent} decimals={0} unit="%" />}
                color="text-purple-400"
              />
              <MetricCard
                label="Max Gradient"
                value={<AnimatedMetric value={activeRouteData.metrics.maxGradient} decimals={1} unit="‰" />}
                color="text-red-400"
              />
              <MetricCard
                label="Travel Time"
                value={<AnimatedMetric value={activeRouteData.metrics.travelTime} decimals={0} unit=" min" />}
                color="text-cyan-400"
              />
            </div>
          </div>
        )}

        {!activeRouteData && (
          <div className="p-4">
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-400">Select a route to view detailed metrics</p>
            </div>
          </div>
        )}

        {/* Comparison Summary */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Comparison</h2>
          <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Best Solar Yield</span>
              <span className="text-blue-400 font-medium">Route C (94 GWh/yr)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Best Wind Yield</span>
              <span className="text-amber-400 font-medium">Route B (78 GWh/yr)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Lowest Cost</span>
              <span className="text-emerald-400 font-medium">Route A ($2.8B)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Best Overall</span>
              <span className="text-emerald-400 font-medium">Route C (3.52/5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 bg-slate-900/80">
        <p className="text-[10px] text-slate-500 text-center">
          Data: Geoscience Australia, ANU RE100, EnergyCo NSW
        </p>
      </div>
    </div>
  );
}

function LayerToggle({ label, icon, checked, onChange }: { label: string; icon: React.ReactNode; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-slate-300">{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-emerald-500" />
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: React.ReactNode; color: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-2">
      <p className="text-[10px] text-slate-400 uppercase">{label}</p>
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
}
