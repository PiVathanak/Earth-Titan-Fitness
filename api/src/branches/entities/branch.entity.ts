export type HolidayType = 'regular' | 'adjusted' | 'closed';

export interface HolidayEntry {
  date: string; // YYYY-MM-DD
  name: string;
  type: HolidayType;
  openingTime?: string; // HH:mm when type === 'adjusted'
  closingTime?: string; // HH:mm when type === 'adjusted'
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface GymBranch {
  id: number;
  name: string;
  address: string;
  image: string;
  badge: string;
  openingTime: string; // HH:mm (Mon–Fri)
  closingTime: string; // HH:mm (Mon–Fri)
  weekendOpeningTime: string; // HH:mm (Sat–Sun)
  weekendClosingTime: string; // HH:mm (Sat–Sun)
  is24Hours: boolean;
  capacityPercent: number;
  amenities: Amenity[];
  holidaySchedule: HolidayEntry[];
}
