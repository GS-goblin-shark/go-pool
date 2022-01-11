# Go-Pool: A Carpool Connection App

## Purpose

Go-Pool is an application designed for parents to connect with other parents whose children attend the same school.  Parents are able to create an account using a school-provided access code.  Once they have an account, they are able to arrange carpools to school events through a message board system.

## About this project
- what it does
- why chosen tech was used
- challenges faced and features hope to add

## Getting Started

This application requires:
- a connection to a SQL database (we used ElephantSQL)
- a connection to a NoSQL database (we used MongoDB)
- a Google Maps API key (sign up free by following the Google Maps [documentation](https://developers.google.com/maps/documentation/javascript/get-api-key))

Install the dependencies and start the server
```sh
npm install
```

To launch the program in production mode:
```sh
npm run start
```
To launch the program in development mode:
```sh
npm run dev
```

Add a .env file with the following info:
```sh
PG_Username = ...
PG_Password = ...
API_KEY = ...
```

- PG_Username and Password are used in userModel.js to connect to your database.  Enter your username and password strings in the .env file.
- API_KEY should be set equal to your Google API Key and is used in the userInfo.jsx component to access the Google Maps API in order to display a user's location.

## Features
- Sign-up page to create an account
- Log-in page to access your account
- User Dashboard that displays upcoming event threads, a calendar of event threads, and a form for creating a new thread for an event.
- When you click on an event thread, you can view messages that have been posted about the event.  You can also reply to existing messages here.
- Direct Messages (in progress): send and receive private messages to other users
- User Info: Click on a person's name to send them a message or see their location.


## Tech

Go-Pool uses a number of open source projects to work properly:
- React
- react-calendar
- google-maps-react
- Bootstrap
- Sass
- react-modal