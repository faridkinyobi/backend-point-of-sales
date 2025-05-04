import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import { handlerErrorMiddleware } from './middleware';
import { db } from './utils';
import config from './config';

const app = express();

const PORT = config.port;
const HOST = config.host;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('wellcome');
  db.$connect()
    .then(() => {
      res.send('Database connected');
      console.log('Database connected');
    })
    .catch(() => {
      res.send('Failed to connect to the database');
    });
});
app.use(routes);

app.use(handlerErrorMiddleware);
