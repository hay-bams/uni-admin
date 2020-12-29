# UNI ADMIN

[![Build Status](https://travis-ci.org/hay-bams/uni-admin.svg?branch=master)](https://travis-ci.org/hay-bams/uni-admin) [![Coverage Status](https://coveralls.io/repos/github/hay-bams/uni-admin/badge.svg?branch=master)](https://coveralls.io/github/hay-bams/uni-admin?branch=master)

## Introduction

UNI-ADMIN is a simple application where the admins of an imaginary institution can register students for the imaginary institution and also register courses for them

---

## API Documentation
This application uses GraphQL which is automatically documented, you should click on the docs button on your GraphQL playoground to see the documentation.
## Application Features
* Admins can be created
* Admins can log in
   ### After Authentication
* Admins can see a paginated list of all students
* Admins can add/register a new student
* Admins can register new courses for a student
* Admins can unregister courses for a student
* Admins can see a paginated list of all available courses
* Admins can add a new course
* Admins can edit a course

---
## Technology Stack
* Typescript
* NodeJs
* ExpressJs
* MongoDB
* React
* AntD
* Jest
* ApolloGraphQL

---
## Getting Started
* Install Nodejs and MongoDB
* Start Docker client if you have it, otherwise download it  [here](https://www.docker.com/products/docker-desktop)
* clone the repository with this command on your command line interface or bash

```
> git clone https://github.com/hay-bams/uni-admin.git
```

* create a .env file at the root of your application
```
> touch .env
```

* set the following envinronment variables in the .env file at the root of your application
```
   - PORT=YOUR SERVER LISTENING PORT
   - SALT_ROUND=SET TO AN INTEGER VALUE
   - SECRET=YOUR SECRET, it can be anything
   - DB=YOUR DATABASE NAME
   - NODE_ENV=development
   - MONGO_LOCAL_URI=mongodb://db:27017
   - PUBLIC_URL= http://localhost:3000
   - REACT_APP_API_URL=http://localhost:9005/api  - please change this port to you server listening port specified above    

```
* start docker up from the root of your application like this
  ```
   > docker-compose up
  ```
* Visit the public url you set in the env file to see the application 
* You can also visit the graphql playground to test the backend, the playground is at REACT_APP_API_URL you set up above 

---
## Author
Ayobami Adelakun