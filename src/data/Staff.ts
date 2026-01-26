// src/data/staff.ts
import type { ImageMetadata } from 'astro';

// Import staff photos
import joshuaPhoto from '../assets/images/staff/joshua_belverio.png';
import kamilPhoto from '../assets/images/staff/kamil_belverio.png';
import susanPhoto from '../assets/images/staff/susan_garner.jpg';
import taeganPhoto from '../assets/images/staff/taegan_maishman.png';
import helenPhoto from '../assets/images/staff/helen_giannadrea.jpeg';
import rachelPhoto from '../assets/images/staff/rachel_presley.jpg';

export interface StaffMember {
  name: string;
  title: string;
  bio: string;
  image: ImageMetadata;
}

export const staff: StaffMember[] = [
  {
    name: "Joshua Belverio",
    title: "Owner / Instructor",
    bio: "Joshua began his career in dance right here at Classic Ballroom more than 15 years ago. He is certified in, and has extensive training in, both American and International styles of dance. Joshua is a proud member of the US TerpsíChore Association (USTA) holding dual fellow degrees. Joshua is also an NDCA championship level adjudicator, invigilator, and USTA examiner for professional examinations.",
    image: joshuaPhoto
  },
  {
    name: "Kamil Belverio",
    title: "Owner / Instructor",
    bio: "Kamil has been a part of the Classic Ballroom team since 2010. Since then he has become an integral member of our staff, bringing his passion for dance to his students. He has been involved in competitions, showcases, and other staff performances. Kamil holds degrees in all major styles, including dual fellow degrees. Kamil is also an NDCA championship level adjudicator, invigilator, and USTA examiner for professional examinations.",
    image: kamilPhoto
  },
  {
    name: "Susan Garner",
    title: "Office Manager",
    bio: "Susan has been dancing at Classic Ballroom since 2018. In 2021 she became the studio office manager handling everything from scheduling lessons to organizing events and helping out with anything that needs to get done in the studio. Susan's hard work and dedication to the studio have been a huge asset to the Classic Ballroom team.",
    image: susanPhoto
  },
  {
    name: "Taegan Maishman",
    title: "Instructor",
    bio: "Taegan has been dancing and performing at Classic Ballroom for many years. After completing an internship with the studio in 2019 he began his teaching career. His passion for dance and ease with teaching has made him a valuble asset to the Classic team. Taegan holds an Associate level degrees in Ballroom, Rhythm and Smooth from US Terpsichore Assosciation.",
    image: taeganPhoto
  },
  {
    name: "Helen Giannadrea",
    title: "Instructor",
    bio: "Helen spent many years as part of the Classic Ballroom family as a student, before joining the staff as a receptionist in March of 2023, and then moving on to become an instructor in January of 2024. She holds degrees in Associate level International Latin, American Rhythm, and International Ballroom, and is working to earn her degrees in all styles of dance. She believes anyone can learn to dance - so long as they have a little patience, and don't forget to have fun!",
    image: helenPhoto
  },
  {
    name: "Rachel Presley",
    title: "Instructor",
    bio: "Rachel Presley is a full bronze certified American Smooth and Rhythm dance coach with a background in African dance, urban latin dance, and various matrial arts. She began competitive American Rhythm and Smooth dancing at the age of 16. She has become proficient in other dances such as West Coast Swing, Argentine Tango, Polka and Flamenco.",
    image: rachelPhoto
  }
];