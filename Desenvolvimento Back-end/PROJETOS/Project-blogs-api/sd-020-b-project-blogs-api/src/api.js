const express = require('express');
const { middlewareError } = require('./middlewares');
const routes = require('./routes');
 
const app = express();

app.use(express.json());
app.use(routes);
app.use(middlewareError);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
