# Automation Excercise with WDIO

This repo contains the development of a TAF for two different web pages, each with different testing approaches:

1. Functionality tests for https://practicesoftwaretesting.com
2. API tests for https://restful-booker.herokuapp.com

The exercise uses the following tools:

- [Node.js](https://nodejs.org/en)
- [Wdio](https://webdriver.io/)
- [Cucumber](https://cucumber.io/docs/installation/javascript/)
- [Chai.js](https://www.chaijs.com/)
- [Joi](https://joi.dev/api/?v=17.13.3)
- [Eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

And for reports:

- [spec](https://webdriver.io/docs/spec-reporter/)
- [junit](https://webdriver.io/docs/junit-reporter/)
- [HTML Reporter](https://webdriver.io/docs/wdio-html-nice-reporter/)

Among others, to see the full list check out the **package.json** file within this repo.

For CI I've installed [jenkins](https://www.jenkins.io/) locally to execute a pipeline to run lints, API and UI tests.

To compile this project locally follow the steps:

1. Clone this repo
2. Inside the main folder run the command `npm install` in order to have all the dependencies required for the project
3. To run lints use the commands `npm run lint` and `npm run prettier`
4. To run API tests use the command `npm run api`
5. Tu run UI tests use the command `npm run ui`

> NOTE: If you want to modify this project and fix errors found during the `npm run prettier` execution you can use the command `npm run prettier-fix`.

All the commands listed above can be seen and modified in the **package.json** file.
