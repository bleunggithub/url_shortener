# Url Shortener

#### Table of Content

[Installation](#installation)

[How to run](#how-to-run)

[Environment Variables](#environment-variables)

[Tests](#tests)


#### Installation

- Clone the repo

#### How to run

- type `cd url_shortener/client/siemens-client` to change into the front end directory and run `yarn` to install the dependencies
- to start, run `yarn start` to run the app in development mode
- the app should pop up on your browser, or if it hasn't, go to `http://localhost:3000/`
- In the project directory, you can run:`yarn start`

#### Environment Variables

- create a .env file and add the environment variables as demonstrated in the .env.example file with your own value

#### Tests

- To run tests, use `yarn test`

- To build a production-ready version, use `yarn build`. It builds the app for production to the `public` folder in the server directory

##### Test cases

###### Home

- renders 2 children on mount without crashing

###### Loading

- renders loading svg on mount
- redirects when data is returned

###### Input

- renders without crashing
- display 1 input and 2 buttons
- submit button onClick sends post req AND get req (query invalidated)

- reset button onclick clear form

###### DisplayResults

- sends "GET" req on mount
- renders without crashing
- focus => highlight => copy
- link onClick navigate to another url
