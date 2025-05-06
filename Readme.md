How to Run The App

## Server

# Development

1. go to folder server with terminal do this "cd ./server",
2. run "npx sequelize db:create"
3. run "npx sequelize db:migrate"
4. Make sure create .env and development section in .env is not empty
5. run "npm install"
6. run "nodemon bin/www.js"

# Testing

1. go to folder server with terminal do this "cd ./server",
2. Make sure create .env and testing section in .env is not empty
3. run "npx sequelize db:create"
4. run "npm run test"

## Client

1. open new terminal in vscode terminal and go to folder client with "cd ./client"
2. Make sure create .env , and make .env is not empty
3. run "npm install"
4. run "npm run dev"

## Architecture

The architectural pattern used in this project is a REST API, featuring React on the client side, Express.js on the server side with Sequelize as the ORM, JSON Web Tokens for authentication, and deployed on Vercel.
