// CMS-backed: content/contact.json (editable via /admin)
import contactData from '../../content/contact.json';

export const contact = contactData as {
  phone: string;
  phoneDisplay?: string;
  email: string;
  address: { line1: string; line2: string };
};
