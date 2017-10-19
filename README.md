# Authentication Microservice P.O.C.

Authentication Microservice P.O.C. with Node and Redis

## TODO

- Implement third party Auth strategies.
- Add unit test.
- Include API documentation.
- Deployment strategy.

## Getting Started

### Prerequisites

- Install Node.js on system.
- Install Docker on system.
- Install Redis on system (only if running service without Docker)

### Installing

#### Running with Docker (recommended)

- Clone this repo on local machine and navigate into directory.
- Run microservice application: ```docker-compose up```

#### Running manually 

- Clone this repo on local machine and navigate into directory.
- Install NPM dependencies: ```npm install```
- Run microservice locally: ```npm run dev```
- API will be served on localhost and port 3001 as default.

## Running the tests

### Unit tests

Unit test will always run before running non-dev service, however tests can be run for development purposes with ```npm test``` command.

## Deployment

TODO

## Built With

* [Node.js](http://www.nodejs.org) - Node.js
* [Express.js](https://expressjs.com) - Web framework for Node.js
* [Redis](https://redis.io/) - Open source in-memory data structure store
* [Docker](https://docs.docker.com/compose/install/) - Used to build and run application container and its services

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
