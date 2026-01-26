import type { ImageMetadata } from 'astro';

// Import your event images
import nyeParty from '../assets/images/flyer1.png';
import valentineDance from '../assets/images/dance_social1.png';
import springGala from '../assets/images/dance_social2.png';

export interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  image: ImageMetadata;
}

export const events: Event[] = [
  {
    title: "New Years Eve",
    date: "December 31st",
    time: "9PM - 1AM",
    description: "Enjoy a night of dancing, champagne, and hot and cold hors d'oeuvres while the new year comes around!",
    image: nyeParty
  },
  {
    title: "Valentine's Dance",
    date: "February 14th",
    time: "7PM - 11PM",
    description: "Celebrate love with an evening of romantic ballroom dancing and refreshments!",
    image: valentineDance
  },
  {
    title: "Spring Gala",
    date: "April 20th",
    time: "6PM - 10PM",
    description: "Welcome spring with elegant dancing, live music, and delicious appetizers!",
    image: springGala
  }
];

// Export individual events if needed
export const currentEvent = events[0];
export const upcomingEvents = events.slice(1);