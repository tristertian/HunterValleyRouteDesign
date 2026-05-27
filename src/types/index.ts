export interface Station {
  id: string;
  name: string;
  type: 'major' | 'minor';
  lat: number;
  lng: number;
  energyFeatures: string[];
  passengerCapacity: number;
}

export interface ElevationPoint {
  distance: number; // km from start
  elevation: number; // meters
  gradient: number; // percentage
  isTunnel: boolean;
  isViaduct: boolean;
}

export interface RouteMetrics {
  length: number; // km
  solarYield: number; // GWh/year
  windYield: number; // GWh/year
  tunnelBridgePercent: number; // percentage
  maxGradient: number; // percentage
  constructionCost: number; // $B AUD
  travelTime: number; // minutes
  environmentalScore: number; // 1-5
  gridIntegrationScore: number; // 1-5
}

export interface Route {
  id: 'A' | 'B' | 'C';
  name: string;
  description: string;
  philosophy: string;
  color: string;
  coordinates: [number, number][];
  elevation: ElevationPoint[];
  metrics: RouteMetrics;
  stations: Station[];
}

export interface SolarZone {
  id: string;
  name: string;
  polygon: [number, number][];
  ghi: number; // kWh/m2/day
  capacity: number; // MW potential
}

export interface WindZone {
  id: string;
  name: string;
  polygon: [number, number][];
  avgWindSpeed: number; // m/s at 80m
  capacity: number; // MW potential
}

export interface ExistingProject {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'battery' | 'coal' | 'hydro';
  lat: number;
  lng: number;
  capacity: string;
  status: 'operational' | 'construction' | 'planned' | 'closing';
  description: string;
}

export interface ProtectedArea {
  id: string;
  name: string;
  polygon: [number, number][];
  type: 'national_park' | 'state_forest' | 'conservation_area' | 'world_heritage';
}

export interface LayerState {
  routeA: boolean;
  routeB: boolean;
  routeC: boolean;
  solarZones: boolean;
  windZones: boolean;
  existingProjects: boolean;
  protectedAreas: boolean;
  stations: boolean;
}
