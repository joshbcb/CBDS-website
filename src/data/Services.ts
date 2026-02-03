// CMS-backed: content/services.json (editable via /admin)
import servicesData from '../../content/services.json';

export interface Service {
  id: string;
  image: string;
  title: string;
  hoverText: string;
}

export const services: Service[] = servicesData.services;

export const smallServicesIds = ['lessons', 'weddings', 'showcases'] as const;

export function getServicesForSmallSection(): Service[] {
  return smallServicesIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => s != null);
}
