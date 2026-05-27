import type { SolarZone } from '../types';

// Solar potential zones in Hunter Valley based on GHI >4.4 kWh/m2/day, slope <5°, flat terrain
export const solarZones: SolarZone[] = [
  {
    id: 's1',
    name: 'Maitland-Solar Zone',
    ghi: 4.5,
    capacity: 150,
    polygon: [
      [-32.70, 151.50],
      [-32.70, 151.60],
      [-32.78, 151.60],
      [-32.78, 151.50],
    ],
  },
  {
    id: 's2',
    name: 'Singleton Valley Solar',
    ghi: 4.6,
    capacity: 300,
    polygon: [
      [-32.52, 151.12],
      [-32.52, 151.28],
      [-32.62, 151.28],
      [-32.62, 151.12],
    ],
  },
  {
    id: 's3',
    name: 'Upper Hunter Flats',
    ghi: 4.7,
    capacity: 450,
    polygon: [
      [-32.20, 150.82],
      [-32.20, 150.95],
      [-32.35, 150.95],
      [-32.35, 150.82],
    ],
  },
  {
    id: 's4',
    name: 'Broke-Fordwich Agrivoltaics',
    ghi: 4.5,
    capacity: 200,
    polygon: [
      [-32.68, 150.95],
      [-32.68, 151.15],
      [-32.78, 151.15],
      [-32.78, 150.95],
    ],
  },
  {
    id: 's5',
    name: 'Wollombi Brook Valley',
    ghi: 4.4,
    capacity: 180,
    polygon: [
      [-32.72, 151.20],
      [-32.72, 151.42],
      [-32.85, 151.42],
      [-32.85, 151.20],
    ],
  },
  {
    id: 's6',
    name: 'Camberwell Alluvial Plain',
    ghi: 4.6,
    capacity: 250,
    polygon: [
      [-32.40, 150.95],
      [-32.40, 151.10],
      [-32.52, 151.10],
      [-32.52, 150.95],
    ],
  },
  {
    id: 's7',
    name: 'Muswellbrook Mine Rehabilitation',
    ghi: 4.7,
    capacity: 350,
    polygon: [
      [-32.22, 150.82],
      [-32.22, 150.92],
      [-32.32, 150.92],
      [-32.32, 150.82],
    ],
  },
  {
    id: 's8',
    name: 'Mount View Terraced Solar',
    ghi: 4.4,
    capacity: 120,
    polygon: [
      [-32.82, 151.22],
      [-32.82, 151.38],
      [-32.92, 151.38],
      [-32.92, 151.22],
    ],
  },
];
