
const express = require('express');
const {connect, getUsers} = require('./db.js');

const app = express();
const PORT = 3080;

// place holder for the data
const users = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (_, res) => {
    res.send('App Works !!!!');
});

app.post('/user', (req, res) => {
  const {user} = req.body;
  users.push(user);
  res.json("user addedd " + user);
});

app.get('/users', async (_, res) => {
  console.log('get /users');
  
  const users = await getUsers();
  res.json(users);
})

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
    connect();
});