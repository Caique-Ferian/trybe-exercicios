const express = require('express');
const cors = require('cors');
const router = require('./controllers/routes');
const { errorMiddleware } = require('./middleware');

const app = express();
app.use(cors());
app.use('/images', express.static('public/images'));
app.use(express.json());
app.use(router);
app.use(errorMiddleware);
app.get('/coffee', (_req, res) => res.status(418).end());

// app.all('*', (_req, _res, next) => {
//   next({ code: 404, message: 'Bad request' });
// });

// app.use((err, _req, res, _next) => {
//   const { code, message } = err;
//   res.status(code).json({ message });
// });

module.exports = app;
