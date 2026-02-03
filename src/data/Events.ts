// CMS-backed: content/events.json (editable via /admin)
import eventsData from '../../content/events.json';

export interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

export const events: Event[] = eventsData.events;
export const currentEvent = events[0];
export const upcomingEvents = events.slice(1);
