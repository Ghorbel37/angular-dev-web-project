# Research Lab Manager

An Angular web app for managing a research lab: its members, their publications, the events they attend and the tools they use. It was built for a web development course and deployed on Firebase.

## Features

- **Login** with Firebase Authentication (email and password), a route guard and an HTTP interceptor that adds the JWT to API calls
- **Members:** list, create, edit and delete members, assign supervisors, and link members to publications, events and tools
- **Publications, events and tools:** list and manage each, with create/edit dialogs
- **Dashboard** with charts that summarize the lab's data
- Angular Material interface with confirmation dialogs

## Tech stack

- Angular 16, Angular Material
- Chart.js with ng2-charts for the dashboard
- Firebase (Authentication and hosting) with AngularFire
- json-server as a mock backend during development

## Backend

The app talks to a REST API through four services: members, events, publications and tools. During the course it started with **json-server** as a mock backend, using `src/assets/db.json`. The services also understand the Spring Data REST response format (`_embedded`), so they can work with a Spring backend that exposes the same resources.

## Getting started

### Requirements

- Node.js 16 or 18
- Angular CLI 16 (`npm install -g @angular/cli@16`)
- A Firebase project with Email/Password sign-in enabled

### Configuration

The configuration file `src/app/environment.ts` is not committed because it contains your Firebase keys. Create it with:

```ts
export const environment = {
  apiUrl: 'http://localhost:3000', // base URL of the backend or json-server
  memberApi: '',                  // path prefix of each service, if any
  eventApi: '',
  publicationApi: '',
  toolApi: '',
};

export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
};
```

Copy the `firebaseConfig` values from your Firebase project settings.

### Run

```bash
npm install
npm run json-server   # mock backend on http://localhost:3000
ng serve              # app on http://localhost:4200
```
