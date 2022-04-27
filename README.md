<h1 align="center">HILL STREET BOOKS</h1>
<h2 align="center">FRONT END</h2>
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
    </li>
    <li>
      <a href="#prerequisites">Prerequisites</a>
   </li>
   <li>
      <a href="#dependency-modules">Dependency Modules</a>
   </li>
   <li>
      <a href="#installation">Installation</a>
   </li>
    <li>
      <a href="#testing">Testing</a>
   </li>
   <li>
      <a href="#developers-guide">Developers Guide</a>
   </li>
  </ol>
</details>

## About the project

Hill Street Books is an interactive bookstore for self-published children’s books authors. Hill Street Books is trying to bridge the gap between the user and the authors. Many bookstores only publish small information about the author and their book. Hill Street Books allows for interacting with content on the author page of the bookstore along with purchasing the specific book. Some of the content on the page is videos, coloring pages, contest, and different featured characters. Authors will be able to generate more profit by managing transactions themselves and marketing their own books. Children interacting with the page will keep wanting to come back and feel like the authors books are always coming back to life.

## Prerequisites

The application's frontend is built using [React](https://reactjs.org/). It uses npm package manager to get its dependencies.
To have this project running on you local machine, you need to install the following:

1. [NPM](https://docs.npmjs.com/)
2. [ReactJS](https://reactjs.org/)

## Dependency Modules

The following dependencies were used in the application
| Name | Description |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [react](https://www.npmjs.com/package/react) | React.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. |
| [react-dom](https://www.npmjs.com/package/react-dom) | This package serves as the entry point to the DOM and server renderers for React. |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom) | The react-router-dom package contains bindings for using React Router in web applications. |
| [react-scripts](https://www.npmjs.com/package/react-scripts) | This package includes scripts and configuration used by Create React App.|
| [axios](https://www.npmjs.com/package/axios) | Promise based HTTP client for the browser and node.js.|
| [web-vitals](https://www.npmjs.com/package/web-vitals) | The web-vitals library is a tiny (~1K), modular library for measuring all the Web Vitals metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools.|
| [email-validator](https://www.npmjs.com/package/email-validator) | A simple module to validate an e-mail address.|
| [@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) | Font Awesome Kits are the easiest way to get Font Awesome icons into the projects.|
| [@fortawesome/free-brands-svg-icons](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons) | Font Awesome Kits are the easiest way to get Font Awesome icons into the projects.|
| [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) | Font Awesome Kits are the easiest way to get Font Awesome icons into the projects.|
| [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) | Font Awesome Kits are the easiest way to get Font Awesome icons into the projects.|
| [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) | Provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.|
| [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) | The React Testing Library is a very lightweight solution for testing React components.|
| [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) | User-event tries to simulate the real events that would happen in the browser as the user interacts with it.|

## Dev Dependency Modules

The following development dependencies were used in the application
| Name | Description |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [node-sass](https://www.npmjs.com/package/node-sass) | Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. |

## Installation

To have this application running on you local machine, you need to install the <a href="#prerequisites">prerequisites</a> first.
Once you have everything installed, you need to do the following,

1. Clone the repository.
   ```sh
   git clone https://github.com/hillstreetbooks/hill-street-books-frontend.git
   ```
2. Install dependencies.
   ```sh
   npm install
   ```
3. Copy the .env.sample to .env and update the Configuration Variables.
   ```sh
   cp .env.sample .env
   ```
4. Lints and fixes files.
   ```sh
   npm run lint
   ```
5. Compiles and hot-reloads for development.
   ```sh
   npm start
   ```
6. Compiles and minifies for production.
   ```sh
   npm run build
   ```

## Testing

1. Run e2e Tests.
   ```sh
   npm run test:e2e
   ```

## Developers Guide

This guide instructs some of the good coding and PR practices.

To generate documentation

```sh
npm run docs:generate
```

`docs` Directory is generated.

### PR Guidelines

1. There are two types of PR - draft and ready for review. We use Draft PRs to get early feedback from peers when the implementation path is unclear.
2. Always assign everyone as the reviewers for the PR.
3. Ideally, we want 2 reviews before we move the ticket to QA/ Testing.

### Branching Guidelines

1. Create one branch for every new ticket that you start working on.
2. All the features must be branched off `develop`.
3. Branch names start with the ticket code, followed by the title of the ticket.

### Commit Guidelines

1. Each commit message should start with the ticket code, followed by your commit message. Eg.
   ```sh
   git commit -m "[HSB-1] Initial Project commit"
   ```
