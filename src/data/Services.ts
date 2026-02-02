import type { ImageMetadata } from 'astro';

import lessonsImage from '../assets/images/dance_lesson_wide.png';
import weddingsImage from '../assets/images/dance_wedding_wide.png';
import tapImage from '../assets/images/tap.png';
import competitionImage from '../assets/images/dance_comp.png';
import countryImage from '../assets/images/country_line_dance.png';
import partyImage from '../assets/images/themed_party.png';
import kidsImage from '../assets/images/kids_dance.png';
import socialImage from '../assets/images/dance_social.png';
import performanceImage from '../assets/images/dance_performance.png';
import groupImage from '../assets/images/dance_gc.png';

export interface Service {
  id: string;
  image: ImageMetadata;
  title: string;
  hoverText: string;
}

export const services: Service[] = [
  {
    id: 'lessons',
    image: lessonsImage,
    title: 'Dance Lessons',
    hoverText:
      "Whether you're flying solo or stepping out with a partner, our instructors meet you where you are. <br><br>Move at your pace from social foundation through gold and open—Waltz, Cha Cha, Hustle, and beyond. Your journey, your style.",
  },
  {
    id: 'weddings',
    image: weddingsImage,
    title: 'Wedding Dances',
    hoverText:
      "Your first dance should feel like yours. <br><br>We design a wedding dance that fits your song, your story, and your comfort level—from a simple sway to full choreography. Private lessons and packages tailored to your big day.",
  },
  {
    id: 'tap',
    image: tapImage,
    title: 'Tap Dance',
    hoverText:
      "Find your rhythm from the ground up. Our tap program welcomes beginners and intermediates alike—learn technique, timing, and style in a supportive setting. <br><br>Private and group options available.",
  },
  {
    id: 'competitions',
    image: competitionImage,
    title: 'Competitions',
    hoverText:
      "Ready to take the floor? Train with our coaches and compete at events throughout the year. <br><br>We'll help you polish technique, build routines, and step onto the podium with confidence.",
  },
  {
    id: 'country',
    image: countryImage,
    title: 'Country Line Dance',
    hoverText:
      "No partner required—just bring your boots and your energy. <br><br>Our country line dance classes get everyone moving together. Learn classic and current line dances in a fun, social atmosphere.",
  },
  {
    id: 'parties',
    image: partyImage,
    title: 'Themed Parties',
    hoverText:
      "Join us for fun social events hosted regularly by Classic Ballroom!<br><br>From holidays, to parties and special events, we have something for everyone.",
  },
  {
    id: 'kids',
    image: kidsImage,
    title: 'Classic Kids',
    hoverText:
      "Ages 5–17: start here with our beginner-friendly group class, then grow with us. <br><br>Kids can add private lessons, group classes, competitions, and showcases whenever they're ready. Dance becomes a lifelong adventure.",
  },
  {
    id: 'social',
    image: socialImage,
    title: 'Social Events',
    hoverText:
      "Dance isn't just lessons—it's community. Join us for holidays, parties, and special events throughout the year. <br><br>No experience needed; just show up, meet other dancers, and have a great time.",
  },
  {
    id: 'showcases',
    image: performanceImage,
    title: 'Showcases',
    hoverText:
      "Take the spotlight in our spring and fall showcases. <br><br>Work with us on learning choreography, technique, and stage presence—then perform for family and friends. A milestone you'll remember.",
  },
  {
    id: 'group',
    image: groupImage,
    title: 'Group Classes',
    hoverText:
      "Drop in almost any day: ballroom and Latin technique, tap, country line dance, and more. <br><br>Learn in a group, make friends, and build skills at a fraction of the cost. Check the calendar and find your class.",
  },
];

/** Service IDs shown in the SmallServices section (homepage). */
export const smallServicesIds = ['lessons', 'weddings', 'showcases'] as const;

export function getServicesForSmallSection(): Service[] {
  return smallServicesIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => s != null);
}
