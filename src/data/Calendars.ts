// src/data/calendars.ts
import type { ImageMetadata } from 'astro';

// Import calendar images (can be PDF screenshots or images)
import januaryCalendar from '../assets/images/calendars/jan26.png';
import decemberCalendar from '../assets/images/calendars/dec25.png';

export interface CalendarMonth {
  name: string;
  image: ImageMetadata;
}

// Update these monthly as needed
export const currentMonth: CalendarMonth = {
  name: "January 2026",
  image: januaryCalendar
};

export const nextMonth: CalendarMonth = {
  name: "December 2025",
  image: decemberCalendar
};