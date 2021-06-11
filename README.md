# InstaPic

- DATE STARTED: 8 JUNE 2021

- This app is deployed on Heroku - https://shorrrty.herokuapp.com/
- For installation, please read the README in the respective directories

#### Table of Content

[Introduction](#introduction) 

[Approach](#approach) 

[Business Outcome](#business-outcome) 


#### Introduction

This web app provides URL shortening to users. Users can enter a long URL and receive a significantly shorter and more user-friendly URL for social sharing, etc.

#### Approach

- React frontend

  - fast loading
  - better user experience
  - possible to use the same code base (with changes) to create a mobile app
  - create-react-app is not so seo-friendly, but seo is not so important in a url shortener project

- React-query

  - react-query offers an simplified approach in managing states in react
  - observes state changes to ensure data is up-to-date
  - handles caching & background updates

- nanoid

  - light-weight and low collision
  - for a small project, UUID may be an overkill
  - shortid package is deprecated, nanoid is recommended instead
  - 60% faster than UUID

- MVC pattern

  - faster and more organised development
  - separate application functionality

- SQL database (PostgresQL) + Knex.js (SQL query builder)
  - provides better/ more robust structure (especially when scaled)
  - ensure ACID compliancy
  - cleaner async flow control
  - portable - easy, convenient migration

#### Business Outcome

- possible use cases
  - company promotions
    - to make links look more legitimate and less 'scam-like'
  - ease of social sharing
  - bookmarks/ personal database
    - can add authentication and note taking etc. to create a personal knowledge database
