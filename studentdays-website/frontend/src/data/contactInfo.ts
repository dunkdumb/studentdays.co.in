/**
 * StudentDays Official Contact & Social Destinations
 * Source of truth: StudentDays reference markup
 */

export const CONTACT_INFO = {
  phone: '+919640389230',
  phoneDisplay: '+91 96403 89230',
  email: 'hey@studentdays.co',
  emailAlt: 'hello@studentdays.co.in',
  instagram: 'https://www.instagram.com/studentdays.co?rpxt=MWdpdXhrMjRnaXg1Yg==',
  instagramHandle: '@studentdays.co',
  whatsappBase: 'https://wa.me/919640389230',
  whatsappCommunity: 'https://chat.whatsapp.com/KGGn6INH2lJIzgUylSXbCM?s=cl&p=i&ilr=4&iam=2',
  hubs: ['Bangalore', 'Chennai', 'Hyderabad', 'Visakhapatnam'],
  
  /**
   * Helper to format a WhatsApp URL with pre-filled text
   */
  getWhatsAppUrl(message: string): string {
    return `https://wa.me/919640389230?text=${encodeURIComponent(message.trim())}`;
  },

  /**
   * Helper to format a mailto URL
   */
  getMailtoUrl(subject: string, body: string): string {
    return `mailto:hey@studentdays.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

export default CONTACT_INFO;
