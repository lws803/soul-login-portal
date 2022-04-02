# Login portal

![pr-merge tests](https://github.com/soul-project/login-portal/actions/workflows/pr-merge.yml/badge.svg)
[![e2e tests](https://github.com/soul-project/login-portal/actions/workflows/e2e.yml/badge.svg)](https://github.com/soul-project/login-portal/actions/workflows/e2e.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Soul Login portal to support application OAuth2.0

<img src="resources/screenshot.png" height="500px" />

## Setup

Run `npm i` and you're all set!

## Start the application

Run `npm run start` to start the application in dev mode

## Deploy the application

Run `npm run build` and then `npm run serve` to serve the built static files.

## Unit tests

Run `npm run test` for unit tests on **changed** files. Hit 'a' to run all tests while in test mode.

## Integration tests

Soul login portal uses cypress for e2e integration tests.

1. Make sure the application has been started before running integration tests.
2. Run `npm run cy:open` to open the cypress interface and click on "run all integration tests" to open a chrome browser and begin testing!

## Examples

1. [simple-login](https://github.com/soul-project/login-portal/blob/main/examples/simple-login)
