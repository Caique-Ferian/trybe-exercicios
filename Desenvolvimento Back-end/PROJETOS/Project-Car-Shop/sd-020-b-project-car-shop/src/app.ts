import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carsRouter from './routes/cars';
import motorcyclesRouter from './routes/motorcycles';

const app = express();

app.use(express.json());
app.use('/cars', carsRouter);
app.use('/motorcycles', motorcyclesRouter);
app.use(errorHandler);

export default app;
