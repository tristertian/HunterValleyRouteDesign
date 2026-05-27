import type { ProtectedArea } from '../types';

// Protected areas in and around Hunter Valley
export const protectedAreas: ProtectedArea[] = [
  {
    id: 'pa1',
    name: 'Yengo National Park',
    type: 'national_park',
    polygon: [
      [-32.85, 150.85],
      [-32.85, 151.10],
      [-33.10, 151.10],
      [-33.10, 150.85],
    ],
  },
  {
    id: 'pa2',
    name: 'Wollemi National Park',
    type: 'national_park',
    polygon: [
      [-32.65, 150.55],
      [-32.65, 150.85],
      [-33.30, 150.85],
      [-33.30, 150.20],
      [-32.90, 150.20],
      [-32.90, 150.55],
    ],
  },
  {
    id: 'pa3',
    name: 'Watagan National Park',
    type: 'national_park',
    polygon: [
      [-33.00, 151.25],
      [-33.00, 151.50],
      [-33.20, 151.50],
      [-33.20, 151.25],
    ],
  },
  {
    id: 'pa4',
    name: 'Werakata National Park',
    type: 'national_park',
    polygon: [
      [-32.75, 151.40],
      [-32.75, 151.55],
      [-32.90, 151.55],
      [-32.90, 151.40],
    ],
  },
  {
    id: 'pa5',
    name: 'Pokolbin State Forest',
    type: 'state_forest',
    polygon: [
      [-32.78, 151.20],
      [-32.78, 151.35],
      [-32.90, 151.30],
      [-32.88, 151.15],
    ],
  },
  {
    id: 'pa6',
    name: 'Corrabare State Forest',
    type: 'state_forest',
    polygon: [
      [-32.90, 151.10],
      [-32.90, 151.30],
      [-33.05, 151.25],
      [-33.00, 151.05],
    ],
  },
  {
    id: 'pa7',
    name: 'Olney State Forest',
    type: 'state_forest',
    polygon: [
      [-33.05, 151.20],
      [-33.05, 151.40],
      [-33.20, 151.35],
      [-33.15, 151.15],
    ],
  },
  {
    id: 'pa8',
    name: 'Greater Blue Mountains WHA',
    type: 'world_heritage',
    polygon: [
      [-32.60, 150.20],
      [-32.60, 150.80],
      [-33.80, 150.80],
      [-33.80, 149.80],
      [-33.20, 149.80],
      [-33.20, 150.20],
    ],
  },
];
