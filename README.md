
# ReactBooking

A simple CRUD (Create, Read, Update, Delete) project, using React, to exercise new technologies.




## How to run the project
After cloning, we need to install: 
```javascript
npm install
```
It is possible to run the project using Vite's default command:
```javascript
npm run dev
```
There are two ways to run tests, unit or e2e:
```javascript
npm run test:unit
npm run test:e2e
```


## Architecture & Code

The components inside this application are divided into two categories: _view and regular components_.

- **Views**: Called by the Router library and are parents to regular components;
- **Regular components** (or only "components"): Called by views or other components.

There are other subdivisions in the application:

- **Enums**: As the name suggests, this division has the enums used by the application;
- **Interfaces**: Responsible for the interfaces that are called by different components;
- **State**: Responsible for the global state management of this application (aka Redux);
- **Tests (unit)**/**Cypress (e2e)**: Part responsible for unit tests and end-to-end tests.

## Technologies used

- React (Vite), Redux, Tailwind, Cypress, Vitest, i18n and other minor libraries.