import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import { handlerErrorMiddleware } from './middleware';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';


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
});
app.use(routes);

app.use(handlerErrorMiddleware);
