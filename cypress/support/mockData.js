export const MOCK_DATA = {
  LOGIN: {
    _id: '62006e73b5a819f3d36d4fcc',
    name: 'John',
    username: 'john@yopmail.com',
    isAdmin: false,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwMDZlNzNiNWE4MTlmM2QzNmQ0ZmNjIiwidXNlcm5hbWUiOiJqb2huQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ3NTUyNTI0fQ.Yjh5T16TRjytlpJ8l5gSRzKr-FWYtPVS_FTY1hAb2sM'
  },
  ADMIN_LOGIN: {
    _id: '62006e73b5a819f3d36d4fcc',
    name: 'John',
    username: 'john@yopmail.com',
    isAdmin: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwMDZlNzNiNWE4MTlmM2QzNmQ0ZmNjIiwidXNlcm5hbWUiOiJqb2huQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ3NTUyNTI0fQ.Yjh5T16TRjytlpJ8l5gSRzKr-FWYtPVS_FTY1hAb2sM'
  },
  AUTHOR_INFO: {
    _id: '62006e73b5a819f3d36d4fcc',
    name: 'John',
    username: 'john@yopmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwMDZlNzNiNWE4MTlmM2QzNmQ0ZmNjIiwidXNlcm5hbWUiOiJqb2huQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ3NTUyNTI0fQ.Yjh5T16TRjytlpJ8l5gSRzKr-FWYtPVS_FTY1hAb2sM'
  },
  AUTHOR_LIST: [
    {
      _id: '62006e73b5a819f3d36d4fcc',
      username: 'john@yopmail.com',
      name: 'John Smith Jr',
      verified: true,
      lastUpdated: '2022-04-03 11:40:21',
      isPublished: true,
      hasAuthorContent: true
    },
    {
      _id: '6201d4c281f6b425d76b7bf2',
      username: 'ryan@yopmail.com',
      name: 'Ryan',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '6201e06f33948e833ee9eedd',
      username: 'bryan@yopmail.com',
      name: 'Bryan',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '620ed6ac84672697ba33d0a5',
      username: 'dalibor@yopmail.com',
      name: 'Dalibor',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '62143614db8159c77bf34b51',
      username: 'tan@yopmail.com',
      name: 'Tan',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '621687aef42f37b8f6d12640',
      username: 'leon@yopmail.com',
      name: 'Leon',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '6248c158c7e720dd6f2c60e9',
      username: 'steve@yopmail.com',
      name: 'Steve Sutherland',
      verified: true,
      hasAuthorContent: false
    },
    {
      _id: '624cd3d8655b7d24f1125f4a',
      username: 'swagat@yopmail.com',
      name: 'Swagat',
      verified: false,
      hasAuthorContent: false
    }
  ]
};

export const URL_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTRATION: '/api/register-author',
  FORGOT_PASSWORD: '/api/forgot-password',
  PASSWORD_RESET: '/api/author/password-reset',
  FETCH_AUTHOR_INFO: '/fetch-author-info',
  UPDATE_AUTHOR_INFO: '/update-author-info',
  FETCH_AUTHORS: '/api/admin/fetch-authors'
};
