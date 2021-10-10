
import attachRoutes from './api/attachRoutes';

const express = require('express');

const app = express();
const PORT = 3080;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

attachRoutes(app);

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});