// src/data/classes.ts
import type { ImageMetadata } from 'astro';

// Import class images
import latinTechImage from '../assets/images/latin_tech.png';
import intensiveImage from '../assets/images/intensive.png';
import smoothTechImage from '../assets/images/smooth_teq.png';
import kidsImage from '../assets/images/classic_kids.png';
import fridaySocialImage from '../assets/images/dance_social1.png';

export interface ClassInfo {
  image: ImageMetadata;
  title: string;
  day: string;
  time: string;
  link?: string;
}

export const classes: ClassInfo[] = [
  {
    image: latinTechImage,
    title: "Latin Technique",
    day: "Tue.",
    time: "8:00 PM",
    link: "/classes/latin_tech"
  },
  {
    image: intensiveImage,
    title: "Monthly Intensive",
    day: "Wed.",
    time: "8:00 PM",
    link: "/classes/intensive"
  },
  {
    image: smoothTechImage,
    title: "Smooth Technique",
    day: "Friday",
    time: "8:00 PM - 9:30 PM",
    link: "/classes/smooth_tech"
  },
  {
    image: kidsImage,
    title: "Classic Kids",
    day: "Saturday",
    time: "2:00 PM - 3:00 PM",
    link: "/classes/classic_kids"
  },
  {
    image: fridaySocialImage,
    title: "Friday Social",
    day: "Sunday",
    time: "4:00 PM - 5:00 PM",
    link: "/classes/swing"
  },
  {
    image: fridaySocialImage,
    title: "Beginner Tap",
    day: "Sunday",
    time: "4:00 PM - 5:00 PM",
    link: "/classes/swing"
  },
  {
    image: fridaySocialImage,
    title: "Intermediate Tap",
    day: "Sunday",
    time: "4:00 PM - 5:00 PM",
    link: "/classes/swing"
  },
  {
    image: fridaySocialImage,
    title: "Saturday Social",
    day: "Sunday",
    time: "4:00 PM - 5:00 PM",
    link: "/classes/swing"
  }
];