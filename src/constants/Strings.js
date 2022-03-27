import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

export const ROUTES = {
  ALL: '*',
  AUTHOR_PAGE: '/author/:authorId',
  AUTHOR_EDIT_PAGE: '/author/edit/:authorId',
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  REGISTRATION: '/registration',
  FORGOT_PASSWORD: '/forgot-password',
  PASSWORD_RESET: '/password-reset/:userId/:uniqueString'
};

export const API_ENDPOINTS = {
  FETCH_AUTHOR_CONTENT: '/author/content',
  FETCH_AUTHOR_INFO: '/fetch-author-info',
  UPDATE_AUTHOR_CONTENT: '/author/update-content',
  REGISTER_AUTHOR: '/register-author',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/author/password-reset',
  UPDATE_AUTHOR_INFO: '/update-author-info'
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
        label: 'Username (email) *'
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password *'
      }
    ]
  }
};

export const PROFILE = {
  FIELDS: {
    username: '',
    name: ''
  },
  CONTENT: {
    heading: 'Welcome, ',
    subHeading: 'Please find your registered information below',
    redirectText: null,
    redirectLink: null,
    fields: [
      {
        type: 'text',
        name: 'username',
        label: 'Username (email) *'
      },
      {
        type: 'text',
        name: 'name',
        label: 'Name *'
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
        label: 'Username (email) *'
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

export const FORGOT_PASSWORD = {
  FIELDS: {
    username: ''
  },
  CONTENT: {
    heading: 'Forgot your password?',
    subHeading: 'Enter your username to reset your password',
    fields: [
      {
        type: 'text',
        name: 'username',
        label: 'Username *'
      }
    ]
  }
};

export const RESET_PASSWORD = {
  FIELDS: {
    password: '',
    confirm_password: ''
  },
  CONTENT: {
    heading: 'Reset your password',
    subHeading: 'Enter your desired password',
    fields: [
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
