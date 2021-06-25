const express = require('express');

const app = express();
app.use(express.json()); 

const routes = require('./paths');

app.use(routes);

app.listen(9999);