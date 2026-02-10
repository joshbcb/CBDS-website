// CMS-backed: content/galleries.json (editable via /admin)
import galleriesData from '../../content/galleries.json';

export interface Gallery {
  title: string;
  images: string[];
}

export const galleries: Gallery[] = galleriesData.galleries;
