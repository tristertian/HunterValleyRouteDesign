import { useState } from 'react';
import type { ElevationPoint } from '@/types';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ElevationProfileProps {
  elevation: ElevationPoint[];
  routeColor: string;
  routeName: string;
}

interface TooltipPayloadEntry {
  payload: ElevationPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-slate-400">Distance: {data.distance.toFixed(1)} km</p>
      <p className="text-sm font-semibold text-slate-100">Elevation: {data.elevation.toFixed(0)} m</p>
      <p className="text-xs text-slate-400">Gradient: {data.gradient.toFixed(1)}%</p>
      {data.isTunnel && <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded">Tunnel</span>}
      {data.isViaduct && <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded ml-1">Viaduct</span>}
    </div>
  );
}

export function ElevationProfile({ elevation, routeColor, routeName }: ElevationProfileProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="absolute bottom-0 left-[380px] right-0 bg-slate-900 border-t border-slate-700 z-[1000]">
        <button
          onClick={() => setCollapsed(false)}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Elevation Profile: {routeName}</span>
          </div>
          <ChevronUp className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    );
  }

  const minElev = Math.min(...elevation.map(e => e.elevation));
  const maxElev = Math.max(...elevation.map(e => e.elevation));
  const yPadding = (maxElev - minElev) * 0.1;

  return (
    <div className="absolute bottom-0 left-[380px] right-0 h-[220px] bg-slate-900 border-t border-slate-700 z-[1000]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: routeColor }} />
          <span className="text-sm font-medium text-slate-200">Elevation Profile: {routeName}</span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 hover:bg-slate-800 rounded transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="px-4 py-2 h-[calc(100%-40px)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={elevation} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id={`elevationGradient-${routeColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={routeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={routeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="distance"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v: number) => `${v}km`}
              label={{ value: 'Distance (km)', position: 'insideBottom', offset: -2, style: { fill: '#64748B', fontSize: 11 } }}
            />
            <YAxis
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              domain={[Math.floor(minElev - yPadding), Math.ceil(maxElev + yPadding)]}
              label={{ value: 'Elevation (m)', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: 11 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            {elevation.map((pt, i) => (
              pt.isTunnel ? (
                <ReferenceLine
                  key={`tunnel-${i}`}
                  x={pt.distance}
                  stroke="#A855F7"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
              ) : pt.isViaduct ? (
                <ReferenceLine
                  key={`viaduct-${i}`}
                  x={pt.distance}
                  stroke="#3B82F6"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
              ) : null
            ))}
            <Area
              type="monotone"
              dataKey="elevation"
              stroke={routeColor}
              strokeWidth={2}
              fill={`url(#elevationGradient-${routeColor.replace('#', '')})`}
              dot={false}
              activeDot={{ r: 5, fill: routeColor, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
