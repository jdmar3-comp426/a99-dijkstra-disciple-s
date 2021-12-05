# API Documentation

## Introduction

Our API and its endpoints are included in the server.js file. We are using it to communicate between
our game and the user database(user.db) defined in database.js, which includes only one table with 
variables related to user information. We decided to create ten endpoints and one default response 
for any other request, which outputs a 404 response error.

## Dependencies

We decided to include and use npm modules such as md5 for password encryption and cors as middleware,
with the backbone of our API constructed using express.js. We also used better-sqlite3 for everything
pertaining to our database.


## Endpoints


**/app/**


- HTTP method GET

- Makes sure that our API works as intended.

- Reads at root endpoint.


**/app/new/user**


- HTTP method POST

- CREATE a new user at endpoint /app/new

- The user information that is set into the database depends in the URLSearchParams passed into it.

- Uses md5 to encrypt the password passed as parameter for a safe storage into the database.

- Used for registering new users into the game.


**/app/update/user/score/:score**

- HTTP method PATCH

- Used for updating your game score information 


**/app/update/user/:logged**

- HTTP method PATCH

- Used for updating your game information such as email or password



**/app/update/user/logged/:logged**

- HTTP method PATCH

- Used for loggin on to your game account



**/app/update/user/logoff/:logged**

- HTTP method PATCH

- Used for loggin off of your game account



**/app/users**


- HTTP method GET

- READ a list of all users.

- Used for retrieving all users so that we can scan them to find a user's particular id.

- Used a lot for debugging/making sure our database was working as intended.



**/app/user/:id**


- HTTP method GET

- Retrieves user data depending on the ID(database's primary key) supplied to the endpoint.

- Used for retrieving user game progress from the database.


**/app/update/user/:id**


- HTTP method PATCH

- UPDATE data for a single user dependent on the ID supplied to the endpoint.

- Uses md5 to encrypt the password passed as parameter for a safe storage into the database.

- COALESCE's input so that it can be used for setting as many variables the user wants without 
altering those that the user does not want to update.

- Used for saving user game progress into the database.


**/app/delete/logged/:logged**


- HTTP method DELETE

- DELETE a single user dependent on the if they are logged in right or not supplied to the endpoint.

- Used when a user wants to delete their account.
