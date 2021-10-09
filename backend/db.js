const { Client } = require('pg');

// externalize to ENV file, don't upload to github
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'invest-calc',
  password: '987321456',
  port: 5432,
})

async function connect() {
  await client.connect();

  console.log("Connected!");
}

async function getUsers() {
  const SQL = 'SELECT * FROM public.user'
    
  return client
    .query(SQL)
    .then(res => {
      const users = res.rows;
      console.log(users);
      return users;
    })
    .catch(e => console.error(e.stack))
}

module.exports = {connect, getUsers}