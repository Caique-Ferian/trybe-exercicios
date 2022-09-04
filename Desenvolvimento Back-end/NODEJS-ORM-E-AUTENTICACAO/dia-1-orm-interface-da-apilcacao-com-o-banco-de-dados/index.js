const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const PORT = process.env.PORT || 3000;
const BookController = require('./controllers/BookController');

app.use(express.json());

app.get('/books', BookController.getAll);
app.get('/books/:id', BookController.getById);
app.post('/books', BookController.create);
app.put('/books/:id', BookController.update);
app.delete('/books/:id', BookController.remove);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));