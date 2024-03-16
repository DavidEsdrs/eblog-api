# Eblog

This an API for blogging. It has features for posting and commenting blog posts, with Role Based Management System (RBMS).

## Features

- Manage posts
- Manage users and its roles
- User authentication and authorization
- [TODO] Like and comment posts

## Getting started

1. Open the destination folder where you want to clone the project.

2. Clone the repository:
```sh
git clone https://github.com/DavidEsdrs/eblog-api.git eblog-api
```

3. Navigate to the eblog-api folder
```sh
cd eblog-api
```

Now, you have two options. The first and easiest way to getting started is through `docker-compose` CLI:
4.1 Run docker compose in the root:
```sh
docker compose up
```
By doing that, it will start the needed services (mysql and app) for running the application.

4.2. If you choose running locally for development purposes, you must have Mysql
installed in your machine

5. Run the migrations:
```sh
npm run migration:run
// OR
yarn migration:run
```

6. Once the migrations are set, run the application for development (watch mode):
```sh
npm run dev
// OR
yarn dev
```

7. Or if you want to run the build version. Build it first:
```sh
npm run build
// OR
yarn build
```

7.1. A folder called "build" was created, run the script "server.js" inside it:
```sh
node build/server.js
```

8. Enjoy! :D

## API Docs

The API Swagger Documentation is located at path "/api-docs".

**Note: The documentation is currently under development**