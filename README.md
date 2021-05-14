# React-Simple Management System

This is a React CRUD Application (for a dynamic UI) integrated with Cloud Firestore’s library (firebase).

## What is it for?

The aim of this app is to collect and store data (documents) that will be displayed on the UI where the user can create, modify and delete them.

## Install dependencies

Install the required npm packages:

`npm install`

Run the App
You can run the app by typing in the Terminal the command line: 

`npm start`

This command will start the server on which the app will be running.

## Check the Result

After the server has started (Compiled successfully!), you can view and test the app opening the browser with the url:

http://localhost:3000/ 

Enjoy!

## Behind the scenes - App overview
The app uses firebase library in which each learner has:

* id, first name, last name, email, score
* we can create, retrieve, update, delete Learners from Firebase Cloud Firestore

The app has two main routes: `/add` for the `AddLearner` component and `/learners` for the `ListLearner` component. 

The root container for the app is in `src/App.js` which will contain a navbar and a `Switch` object that renders the routes matching the path. This allows us to compose routes in the app in many ways (sidebars, breadcrumbs, bootstrap tabs, etc.)

React state vs Redux. For this project I thought React state may be a better option as the state is applied to few components whereas Redux could benefit bigger apps where more components may need to access the state.

I needed a way to pass the "logged in" state of the user across pages, so I saved it to the LocalStorage.
Every protected route will check the local storage for a specific key/value before allowing a user to view
a page that is accessible only to logged-in users.
The local storage is cleaned at logout.

Technology used for the project:

* React 16.13.1
* Firebase 7.19.1
* Bootstrap 4.5.2
