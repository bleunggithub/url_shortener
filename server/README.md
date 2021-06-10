####Routes

# Url Shortener

#### Table of Content

[Installation](#installation)
[How to run](#how-to-run)
[Environment Variables](#environment-variables)
[About the API](#about-the-api)
[Tests](#tests)

#### Installation

- Clone the repo

#### How to run

###### SERVER

- type `cd instapic-server` into the server directory and run `npm install` to install the dependencies
- to start the server, run `node server` or `nodemon server` if you have nodemon installed globalling on your computer
- the server will be running on port 8080

###### DATABASE

- install [PostgresQL](https://www.postgresql.org/)
- after installation of all the dependencies, run `knex migrate:latest`

#### Environment Variables

- create a .env file and add the following environment variables with your own value
  - NODE_ENV=
  - PG_DATABASE=
  - PG_USERNAME=
  - PG_PASSWORD=
  - PG_TEST_DATABASE=
  - JWT_TOKEN_SECRET=
  - JWT_REFRESH_TOKEN_SECRET=
  - CLOUDINARY_URL=
  - CLIENT_DOMAIN=

#### About the API (API Development)

- GET '/api'

  1. User arrives at React frontend and sends a GET request to get all shortened Url from server & database

  - summary: get all saved urls
  - required parameters for request: none
  - available to: all users
  - responses:

    - 200
      - saved url exists
    - 204
      - no saved url in database
    - 500
      - database failure / other error

  - success response data structure:

  ```
    allUrl: {[
        {
            id: number,
            url_id: string,
            long_url: string,
            created_at: string,
        },
    ]}
  ```

- POST '/api'

  1. Client sends a POST request to server with the long URL to be shortened
  2. Server uses nanoId package to generate unique id
  3. Uid is saved into the database
  4. Uid is sent back to frontend
  5. User may copy the shortened url

  - summary: create and save a long url and a new shortened url
  - required parameters for request:
    ```
    { url : string }
    ```
  - available to: all users
  - responses:
    - 200
      - shortened url id created successfully
    - 400
      - error while creating shortened url id
    - 500
      - database failure / other error
  - success response data structure (new item only):
    ```
    urlId: {[
        {
            id: number,
            url_id: string,
            long_url: string,
            created_at: string,
        }
    ]}
    ```

- GET '/api/:id'

  1. User arrives at React frontend and sends a GET request to get a specific shortened Url from server & database
  2. The long url is retrieved from the database and a redirect response is sent back to the client
  3. User is redirected to the long url

  - summary: get and be redirected to the long original url using a short uid
  - required parameters for request:
    ```
    { id : string }
    ```
  - available to: all users
  - responses:
    - 301
      - long url found, redirect to long url
    - 404
      - the short id is not found in the database
    - 400
      - params.id is not present
    - 500
      - database failure / other error
  - success response :
    - long url is stored in location headers and a 301 is sent for redirect

#### Tests

- Create a test database and fill the name in the environment variable ("PG_TEST_DATABASE")
- Change the environment variable ("NODE_ENV") to `test`
- To run tests, use `npm run test`
- Test cases
  - Services
    - createUrlId
      - creates a new entry in database
      - throws error when long url is not present
    - getUrlIds
      - gets all entries from database
    - getLongUrlById
      - returns no data when short id is not present
      - gets correct entry from database
  - Controllers
    - createShortenedUrl
      - creates short id and sends it to user
      - sends status 500 if no long url is entered
    - getAllUrl
      - sends all data retrieved from database to user
      - sends status 204 if no short id in database
    - redirectToLongUrl
      - sends status 301 with long url to user if short id is found in database
      - sends status 404 to user if no url is found
      - send status 400 if no short id is present
