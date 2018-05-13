# Redux Saga (Pluralsight) [![Build Status](https://travis-ci.org/Darmaiad/pluralsight-redux-saga.svg?branch=master)](https://travis-ci.org/Darmaiad/pluralsight-redux-saga) [![https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-redux-saga?branch=master&svg=true](https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-redux-saga?branch=master&svg=true)](https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-redux-saga?branch=master&svg=true)

A (very) functional shopping cart. You can view it [here](https://pluralsight-redux-saga.herokuapp.com/). The project is based on the [Pluralsight](https://www.pluralsight.com/) course: [Redux Saga](https://app.pluralsight.com/library/courses/redux-saga/table-of-contents) by [Daniel Stern](https://github.com/danielstern).

## Installation
* Assuming you have `npm` & `node.js` installed, you can either clone or download the repository. 
* Navigate to the folder that you/was created. 
* Then, run `npm install` on the command line to download the dependencies. 
* You can execute the application in the following modes: 
  * Run `npm run dev` to launch the project in development environment.
  * Run `npm run prod` to launch the project in a production build. 
  * Run `npm test` to run the tests.

## Description
This is a shopping cart project, rich in functionality, showcasing the power of Redux Saga. I developed the project in my own devepment environment. Coding was done along with the course's instructor, while refactoring, and writing comments where deemed necessary.

The course's instructor included a ready-made separate project, which constituted the back-end. I merged and integrated that project with my own. After that, I rewrote the back-end to fit my preferences. 

This project provides the option of running it with one of two servers: one for Development or one for Production. Two [CI](https://en.wikipedia.org/wiki/Continuous_integration) servers are used: [Travis-CI](https://travis-ci.org/) to test the project in a Linux environment and [AppVeyor](https://ci.appveyor.com), to test in a Windows environment. If the [Travis-CI](https://travis-ci.org/) build is successful, it will attempt to deploy the app to [Heroku](https://www.heroku.com/), which will make it available [here](https://pluralsight-redux-saga.herokuapp.com/).