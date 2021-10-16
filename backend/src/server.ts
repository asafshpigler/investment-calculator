
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import * as db from './db';
import attachRoutes from './routes/attachRoutes';

const app = express();
const PORT = 3080;

app.use(express.static('frontend/build'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(session({
    secret: 'secret-key', // TODO: move to env
    resave: true, // TODO: write expplanation
    saveUninitialized: false, // TODO: write explanation
}))

attachRoutes(app);

// TODO: consider how to manage this connection
db.connect().then(() => {
    console.log('connected to db');

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server listening on the port::${PORT}`);
    });
});
