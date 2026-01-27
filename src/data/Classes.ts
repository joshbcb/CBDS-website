// src/data/classes.ts
import type { ImageMetadata } from 'astro';

// Import class images
import latinTechImage from '../assets/images/latin_tech.png';
import intensiveImage from '../assets/images/intensive.png';
import smoothTechImage from '../assets/images/smooth_teq.png';
import kidsImage from '../assets/images/classic_kids.png';
import fridaySocialImage from '../assets/images/dance_social1.png';
import tapImage1 from '../assets/images/tap_dance1.png';
import tapImage2 from '../assets/images/tap_dance2.png';
import saturdaySocialImage from '../assets/images/dance_social2.png';

export interface ClassInfo {
  image: ImageMetadata;
  title: string;
  day: string;
  time: string;
}

export const classes: ClassInfo[] = [
  {
    image: latinTechImage,
    title: "Latin Technique",
    day: "Tuesday",
    time: "8:00 PM",
  },
  {
    image: intensiveImage,
    title: "Monthly Intensive",
    day: "Wednesday",
    time: "8:00 PM",
  },
  {
    image: smoothTechImage,
    title: "Smooth Technique",
    day: "Friday",
    time: "8:00 PM",
  },
  {
    image: kidsImage,
    title: "Classic Kids",
    day: "Saturday",
    time: "5:00 PM",
  },
  {
    image: fridaySocialImage,
    title: "Friday Social",
    day: "Sunday",
    time: "8:00 PM - 10:00 PM",
  },
  {
    image: tapImage1,
    title: "Beginner Tap",
    day: "Sunday",
    time: "10:00 AM",
  },
  {
    image: saturdaySocialImage,
    title: "Intermediate Tap",
    day: "Sunday",
    time: "11:00 AM",
  },
  {
    image: tapImage2,
    title: "Saturday Social",
    day: "Sunday",
    time: "7:00 PM - 9:30 PM",
  }
];