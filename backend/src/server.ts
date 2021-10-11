
import { connect } from './db/connection';
import attachRoutes from './routes/attachRoutes';

const express = require('express');

const app = express();
const PORT = 3080;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

attachRoutes(app);

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);

    connect();
});