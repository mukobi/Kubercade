# Kubercade

[![CircleCI](https://circleci.com/gh/knative-portability/Kubercade.svg?style=svg)](https://circleci.com/gh/knative-portability/Kubercade)

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

Serverless containerized social arcade built on [Knative](https://knative.dev/).

Try it at https://kubercade-l3zyoxchqa-uc.a.run.app/!

## Introduction

An app built as proof of portability for [Knative](https://knative.dev) that extends some open-source arcade games with social functionality. This social functionality includes:

- Forum-style live chat.
- Separate chat rooms for each game and a general chat.
- High-score submission for each game.
- High-score leaderboards.
- Social media sharing.

This app is built as part of a proof of portability project for [Knative](https://knative.dev). It is meant to show the key features of Knative, to test the conformance across various cloud product implementations of Knative, and to document with functioning sample code how one might develop, build, and deploy with Knative. Key features of Knative this app demonstrates include:

- Develop services independently that can be individually deployed, updated, and auto-scaled
- Deploy containerized code with minimal configuration, allowing the developer to focus on features rather than infrastructure
- Run serverless, stateful containers that enable pay-for-use billing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to containerize and deploy the project on a live system.

### Prerequisites

This application is written in [Node.js](https://nodejs.org) and is tested on Node v10.16.0+.

### Installing

How to install the application for local development.

Install dependencies using npm.

```sh
npm install --save-dev
```

Provision a PostgreSQL instance (e.g. via [Google Cloud SQL](https://cloud.google.com/sql/)), initialize it by executing [src/.schema.sql](src/.schema.sql), then provide the app with its connection string via an environment variable.

```sh
export DB_URL="postgres://{username}:{password}@{host}/{database}"
```

### Running the service

The application's source code is written in [TypeScript](https://www.typescriptlang.org/). You have 2 ways to run the application locally.

1. Use `ts-node-dev` to run the source TypeScript. Note: This enables hot-reloading and might be easier for development.

```sh
npm run dev
```

2. Compile the TypeScript code and run Node on the output. Note: This is how a production container should run the application.

```sh
npm start
```

## Running the tests

To run tests using `mocha`, use the test script. Note: This uses `ts-node/register` to run against the source TypeScript, not the compiled JavaScript.

```sh
npm run test
```

To generate a coverage report with [Istanbul](https://istanbul.js.org/), run the coverage script.

```sh
npm run coverage
```

This project follows the [Google TypeScript Style guide](https://github.com/google/gts). Use the check and fix scripts to have `gts` fix style errors.

```sh
npm run check
npm run fix
```

## Deployment

This project is built for [Knative](https://knative.dev/) and should be able to be deployed on any cloud product built on Knative or on any Kubernetes cluster. It has been tested on [Google Cloud Run](https://cloud.google.com/run/). You can try it on [Google Cloud Run](https://cloud.google.com/run/) using this button.

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/knative-portability/Kubercade.git)

You also need to setup a PostgreSQL database and initialize it by executing [src/.schema.sql](src/.schema.sql). Once you've done that, enter its connection string when prompted by Google Cloud Shell.
I.e. `postgres://{username}:{password}@{host}/{database}`

This project is set up for continuous deployment to Google Cloud Run (managed) via [Cloud Build](https://cloud.google.com/run/docs/continuous-deployment), and it will automatically be built and deployed on pushes to the master branch of [this repository](https://github.com/knative-portability/Kubercade).

You can also [manually deploy this project to a service like Cloud Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy). For example, to deploy to the service [SERVICE] in the GCP project with ID [PROJECT-ID] run:

```sh
gcloud builds submit --tag gcr.io/[PROJECT-ID]/[SERVICE]
gcloud beta run deploy --image gcr.io/[PROJECT-ID]/[SERVICE] --platform managed
```

## Built With

### Development

- [Node.js](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
- [GitHub](https://github.com) - Development platform for open source
- [Gunicorn](https://gunicorn.org/) - Python WSGI HTTP Server for UNIX

### Testing

- [Mocha](https://mochajs.org/) - Feature-rich JavaScript test framework running on Node.js and in the browser
- [Chai.js](https://www.chaijs.com/) - BDD/TDD assertion library for node and the browser
- [Circle CI](https://circleci.com/) - Automated CI/CD job running platform

### Services

- [Google Cloud SQL](https://cloud.google.com/sql/) - Fully managed relational database services
- [Google Cloud Build](https://cloud.google.com/cloud-build/) - Continuous build, test, deploy in the cloud
- [Google Cloud Run](https://cloud.google.com/run/) - On top of Knative, run fully managed stateless containers

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Gabriel Mukobi** - _Initial work_ - [mukobi](https://github.com/mukobi)
- **Carolyn Mei** - _Initial work_ - [cmei4444](https://github.com/cmei4444)

See also the list of [contributors](https://github.com/knative-portability/Kubercade/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
