
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
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
}))

attachRoutes(app);

// suboptimal: connection to db remains open
db.connect().then(() => {
    console.log('connected to db');

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on the port::${PORT}`);
    });
});
