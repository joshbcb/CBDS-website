/**
 * Prefixes internal paths with the base URL (e.g. /CBDS-website/ for GitHub Pages).
 * Leaves external URLs (http/https) unchanged.
 */
export function baseUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL ?? '/';
  const trimmed = path.replace(/^\//, '');
  return trimmed ? `${base}${trimmed}` : base.replace(/\/$/, '') || '/';
}
