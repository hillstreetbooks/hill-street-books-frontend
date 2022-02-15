import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  ALL: '*'
};

export const API_ENDPOINTS = {
  REGISTER_AUTHOR: '/register-author',
  LOGIN: '/login'
};

export const LOGIN = {
  FIELDS: {
    username: '',
    password: ''
  },
  CONTENT: {
    heading: 'Welcome, Authors!',
    subHeading: 'Want to be part of the site?',
    redirectText: 'Register Here',
    redirectLink: ROUTES.REGISTRATION,
    fields: [
      {
        type: 'text',
        name: 'username',
        label: 'Username *'
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password *',
        hints: [
          'The password must contain at least 1 lowercase alphabetical character',
          'The password must contain at least 1 uppercase alphabetical character',
          'The password must contain at least 1 numeric character',
          'The password must contain at least one special character',
          'The password must be eight characters or longer'
        ]
      }
    ]
  }
};

export const REGISTRATION = {
  FIELDS: {
    username: '',
    name: '',
    password: '',
    confirm_password: ''
  },
  CONTENT: {
    heading: 'Create An Account',
    subHeading: 'Already have an account?',
    redirectText: 'Sign In',
    redirectLink: ROUTES.LOGIN,
    fields: [
      {
        type: 'text',
        name: 'username',
        label: 'Username *'
      },
      {
        type: 'text',
        name: 'name',
        label: 'Name *'
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password *',
        hints: [
          'The password must contain at least 1 lowercase alphabetical character',
          'The password must contain at least 1 uppercase alphabetical character',
          'The password must contain at least 1 numeric character',
          'The password must contain at least one special character',
          'The password must be eight characters or longer'
        ]
      },
      {
        type: 'password',
        name: 'confirm_password',
        label: 'Confirm Password *'
      }
    ]
  }
};

export const FOOTER_CONTENT = {
  SECTION_ONE: [
    {
      TITLE: 'Hill Street Books',
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
