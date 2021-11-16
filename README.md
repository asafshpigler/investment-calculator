# Investment Calculator

Helping real estate investors make educated decisions by<br>
Visualizing porfitability of prospective properties

[Check it out!](https://shpigler-investment-calculator.herokuapp.com/)

### Installing Locally

Prerequisites:
- Postgres v14.0
- Node v14.18.0

Steps:
1. clone the repo
2. create .env file in /backend directory
3. set .env values:
    PORT - server port
    SECRET - arbitrary value to encrypt cookies
    DB_URI - uri of your local DB
4. create local db named "invest-calc"
5. npm run build
6. npm start
