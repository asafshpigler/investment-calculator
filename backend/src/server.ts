
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import { connect } from './db/connection';
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
    httpOnly: true, // cookie inaccessible to frontend JS
    secure: true, // TODO: improve description phrasing | cookie will be sent only if site is served over https, to prevent easy access to your cookie (and user session) from man in the middle attacks
}))

attachRoutes(app);

// TODO: consider how to manage this connection
connect().then(() => {
    console.log('connected to db');

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server listening on the port::${PORT}`);
    });
});
