# Tutor and Admin Dashboards

## Description

Create two separate dashboards – one for tutors and one for
administrators. Each dashboard should include two distinct features that align with
their roles

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Features
* An endpoint `/api/v1/users/:id/deactivate` that deactivate a user PUT request
* An endpoint `/api/v1/users/:id/update `that updates a user PUT request
* An endpoint `/api/v1/users/:id` that deletes a user account DELETE request
* An endpoint `/api/v1/auth/signup` that allows a user to sign up POST requests
* An endpoint `/api/v1/auth/login` that logs in a user POST request
* An endpoint `/api/v1/tutoringsession` that create a session for a tutor POST request
* An endpoint `/api/v1/tutoringsession/tutor/:tutorId` that get all the tutors sessions GET request
* An endpoint `/api/v1/tutoringsession/tutor/:tutorId/:sessionId` that get a particular tutor session GET request
* An endpoint `/api/v1/tutoringsession/:id` that get update a specific tutor session GET request
* An endpoint `/api/v1/tutoringsession/:tutoringSessionId/student-progress` that track the progress of a student GET request
* An endpoint `/api/v1/studentprogress/:tutoringSessionId` that addeds the progress of a student POST request
* An endpoint `/api/v1/studentprogress/:studentProgressId` that updates the progress of a student PUT request


