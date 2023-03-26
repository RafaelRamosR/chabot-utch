import express from 'express';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import flash from 'connect-flash';
import session from 'express-session';
import helmet from 'helmet';

import routes from './routes';
import { IApiConfig } from './interfaces';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(cookieParser(config.get<string>('SECRET_KEY')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: config.get<string>('SECRET_KEY'),
  resave: false,
  saveUninitialized: false
}));
app.use(compression());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: config.get<IApiConfig>('API').ACCESS_ORIGIN,
  methods: ['DELETE', 'GET', 'POST', 'PUT', 'UPDATE']
}));
app.use(flash());

app.use(config.get<IApiConfig>('API').API_VERSION, routes);
app.use(errorHandler);

export default app;
