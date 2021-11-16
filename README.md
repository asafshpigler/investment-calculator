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
2. create local DB named "invest-calc"
3. create .env file in /backend directory
4. set .env variables:<br>
     PORT - server port<br>
     SECRET - arbitrary string to encrypt cookies<br>
     DB_URI - uri of your local DB
5. npm run build
6. npm start
