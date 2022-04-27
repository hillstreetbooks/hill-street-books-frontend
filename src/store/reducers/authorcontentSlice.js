import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import Cookies from 'js-cookie';
import { AuthorContentService } from '../../services';

const author_details_initial_state = {
  first_name: { value: '', error: '' },
  last_name: { value: '', error: '' },
  dob: { value: moment(), error: '' },
  display_picture: { value: '' },
  email: { value: '', error: '' },
  website: { value: '' },
  location: { value: '', error: '' },
  biography: { value: '', error: '' }
};

const social_links_initial_state = {
  facebook: '',
  instagram: '',
  twitter: '',
  pinterest: ''
};

const videos_initial_state = [{ value: '', error: '' }];

export const authorcontentSlice = createSlice({
  name: 'authorContent',
  initialState: {
    author_details: localStorage.getItem('author_details')
      ? JSON.parse(localStorage.getItem('author_details'))
      : author_details_initial_state,
    social_links: localStorage.getItem('social_links')
      ? JSON.parse(localStorage.getItem('social_links'))
      : social_links_initial_state,
    books: localStorage.getItem('videos')
      ? JSON.parse(localStorage.getItem('videos'))
      : videos_initial_state,
    videos: localStorage.getItem('books')
      ? JSON.parse(localStorage.getItem('books'))
      : []
  },
  reducers: {
    updateUserDetails: (state, action) => {
      const author_details = action.payload;
      localStorage.setItem('author_details', JSON.stringify(author_details));
      state.author_details = author_details;
    },

    resetUserDetails: (state) => {
      state.author_details = author_details_initial_state;
    },

    updateSocialLinks: (state, action) => {
      const social_links = action.payload;
      localStorage.setItem('social_links', JSON.stringify(social_links));
      state.social_links = social_links;
    },

    resetSocialLinks: (state) => {
      state.user_details = social_links_initial_state;
    },

    updateBooks: (state, action) => {
      const hsb_user = Cookies.get('hsb_user')
        ? JSON.parse(Cookies.get('hsb_user'))
        : null;
      if (hsb_user) {
        const books = action.payload;
        localStorage.setItem('books', JSON.stringify(books));
        state.books = books;
      }
    },

    updateVideos: (state, action) => {
      const videos = action.payload;
      localStorage.setItem('videos', JSON.stringify(videos));
      state.videos = videos;
    },

    resetVideos: (state) => {
      state.videos = videos_initial_state;
    },

    updateAuthorContent: (state, action) => {
      const { author_details, social_links, books, videos } = action.payload;
      state.author_details = author_details;
      state.social_links = social_links;
      state.books = books;
      state.videos = videos ? videos : state.videos;
    },

    resetAuthorContent: (state) => {
      localStorage.setItem(
        'author_details',
        JSON.stringify(author_details_initial_state)
      );
      localStorage.setItem(
        'social_links',
        JSON.stringify(social_links_initial_state)
      );
      localStorage.setItem('books', JSON.stringify([]));
      localStorage.setItem('videos', JSON.stringify(videos_initial_state));
      state.author_details = author_details_initial_state;
      state.social_links = social_links_initial_state;
      state.books = [];
      state.videos = videos_initial_state;
    }
  }
});

export const {
  resetUserDetails,
  updateUserDetails,
  resetSocialLinks,
  updateSocialLinks,
  updateBooks,
  updateVideos,
  resetVideos,
  resetAuthorContent,
  updateAuthorContent
} = authorcontentSlice.actions;

export default authorcontentSlice.reducer;
