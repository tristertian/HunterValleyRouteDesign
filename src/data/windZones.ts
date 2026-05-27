import type { WindZone } from '../types';

// Wind resource zones - exposed ridgelines with avg wind speed >6 m/s at 80m
export const windZones: WindZone[] = [
  {
    id: 'w1',
    name: 'Broken Back Range Wind',
    avgWindSpeed: 7.2,
    capacity: 180,
    polygon: [
      [-32.85, 151.15],
      [-32.85, 151.35],
      [-32.95, 151.25],
      [-32.92, 151.10],
    ],
  },
  {
    id: 'w2',
    name: 'Mount Arthur Ridge',
    avgWindSpeed: 6.8,
    capacity: 120,
    polygon: [
      [-32.78, 151.05],
      [-32.78, 151.18],
      [-32.88, 151.12],
      [-32.85, 150.98],
    ],
  },
  {
    id: 'w3',
    name: 'Liverpool Range East',
    avgWindSpeed: 8.1,
    capacity: 300,
    polygon: [
      [-32.20, 150.70],
      [-32.20, 150.85],
      [-32.40, 150.82],
      [-32.35, 150.68],
    ],
  },
  {
    id: 'w4',
    name: 'Watagan Escarpment',
    avgWindSpeed: 6.5,
    capacity: 150,
    polygon: [
      [-33.05, 151.25],
      [-33.05, 151.45],
      [-33.15, 151.40],
      [-33.10, 151.20],
    ],
  },
  {
    id: 'w5',
    name: 'Pokolbin Hills',
    avgWindSpeed: 5.8,
    capacity: 80,
    polygon: [
      [-32.75, 151.20],
      [-32.75, 151.35],
      [-32.85, 151.30],
      [-32.82, 151.15],
    ],
  },
  {
    id: 'w6',
    name: 'Bylong Valley Ridge',
    avgWindSpeed: 7.0,
    capacity: 200,
    polygon: [
      [-32.55, 150.72],
      [-32.55, 150.88],
      [-32.70, 150.85],
      [-32.65, 150.70],
    ],
  },
];
