// CMS-backed: content/staff.json (editable via /admin)
import staffData from '../../content/staff.json';

export interface StaffMember {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export const staff: StaffMember[] = staffData.staff;
