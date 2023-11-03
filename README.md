# NestJS Backend for [Fullstack engineer at Scrapays](https://marbled-antimatter-7d4.notion.site/Full-Stack-Engineering-Test-9a1c56b16fb84fb6852997dca6211d91)

This is a submission for the above test, the readme contains information on how to set up, run and deploy the application.

## Prerequisites

- Node.js (v16 or higher)

## Setup

1. Clone this repository to your local system
2. Create a new `.env` file in the project's root
3. Copy the content of `.env.sample` to the newly created `.env` file
4. Replace the `.env` dummy config values with real values
5. Run `npm install` to install all dependencies

## Unit tests

Run the below command to execute the application's unit tests

```bash
npm run test
```

You can also decide to run the test in watch mode using the below command

```bash
npm run test:watch
```

## E2E test

Run the below command to run all e2e tests

```bash
npm run test:e2e
```

## Start

Run the below command to start the application

```bash
npm run start
```

Or the below (to start the application in watch mode)

```
npm run start:dev
```

By default the application can be accessed from the PORT environment variable.

The graphql server is mounted on the `/graphql` part. You can open it on an app to explore and interact with the different types and operations supported

## Building the app

Run

```bash
npm run build
```

## Stay in touch

- Author - [Priest Sabo Ombugadu](https://www.linkedin.com/in/sabopriest/)

## Workflows

The app is configured to to be built and deployed to heroku using Github actions located at `(.github/workflows/deploy-to-heroku.yml)`
For a successful flow, you need to have the following secrets in your repository

- HEROKU_EMAIL
- HEROKU_API_KEY
- HEROKU_APP_NAME

## Migrations

### Generate migration

Run the below command to generate a new migration. Note: `<migration_name>` is the name of the migration

```bash
npm run migration:generate --name=<migration_name>
```

### Revert migration

Run the below command to the last migration

```bash
npm run migration:run
```
