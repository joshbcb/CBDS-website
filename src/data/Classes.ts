// CMS-backed: content/classes.json (editable via /admin)
import classesData from '../../content/classes.json';

export interface ClassInfo {
  image: string;
  title: string;
  day: string;
  time: string;
}

export const classes: ClassInfo[] = classesData.classes;
