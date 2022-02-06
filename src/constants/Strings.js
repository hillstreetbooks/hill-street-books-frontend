import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  ALL: '*'
};

export const FOOTER_CONTENT = {
  SECTION_ONE: [
    {
      TITLE: 'Talk about your business',
      CONTENT:
        'Hill Street Books is an interactive bookstore for authors and readers. It allows authors to add their books along with videos, downloadable content and more. Readers are able to purchase their favorite authors books while having fun doing it.'
    },
    {
      TITLE: 'Links',
      CONTENT: 'Shopify Home Page',
      ICON: faShopify,
      LINK: 'https://hill-street-books.myshopify.com/'
    },
    {
      TITLE: 'Email',
      CONTENT: 'Email us!',
      ICON: faEnvelope,
      LINK: 'mailto:info@sutherlandmediagroup.ca?subject=Hill Street Books Information Request'
    },
    {
      TITLE: 'Location',
      CONTENT: 'Waterloo, ON',
      ICON: faHome
    }
  ]
};
