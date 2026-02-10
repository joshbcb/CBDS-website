/**
 * Site-wide config for SEO, OG, and structured data.
 * Update siteUrl to your production URL (with or without www).
 */
export const site = {
  name: 'Classic Ballroom Dance Studio',
  /** Production URL (no trailing slash). Used for canonical URLs, OG, sitemap. */
  url: 'https://www.classicballroom.com',
  defaultTitle: 'Classic Ballroom Dance Studio | Ballroom & Latin Dance in Hackettstown, NJ',
  defaultDescription:
    'Ballroom and Latin dance lessons in Hackettstown, NJ. Group classes, private lessons, weddings, and events. Your first lesson is on us—start your dance journey today.',
  /** Default image for social sharing (path from site root, e.g. /images/hero.png). */
  defaultOgImage: '/images/dance_hero1.png',
  /** e.g. en-US */
  locale: 'en-US',
  twitterHandle: '',
} as const;

export function fullUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${site.url}${p}`;
}

export function ogImageUrl(path: string): string {
  return path.startsWith('http') ? path : fullUrl(path);
}
