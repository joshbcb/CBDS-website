// CMS-backed: content/calendars.json (editable via /admin)
import calendarsData from '../../content/calendars.json';

export interface CalendarMonth {
  name: string;
  image: string;
}

export const currentMonth: CalendarMonth = calendarsData.currentMonth;
export const nextMonth: CalendarMonth = calendarsData.nextMonth;
