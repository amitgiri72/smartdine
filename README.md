# Project Name


## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Firebase Setup](#firebase-setup)
- [Start](#start)


## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)

### Installation

## Install dependencies:

npm install --f

## Firebase Setup
This project uses Firebase as the backend. Follow these steps to set up Firebase for your project:

Create a new Firebase project:

Visit Firebase Console.
Click on "Add Project" and follow the setup instructions.
Obtain Firebase configuration:

In your Firebase project, navigate to Project settings > General > Your apps > Firebase SDK snippet > Config.
Copy the configuration.

Add the Firebase configuration in your code where in firebase config:
you have to add firebase congif in two file
1. src/components/Camera/Camera.js
2. src/pages/Chart/Table.js

Replace the values with your Firebase project configuration.
  apiKey: "your apiKey",
  authDomain: "Your authDomain",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId",
  measurementId: "your measurementId",


## start
run this command in terminal
npm start