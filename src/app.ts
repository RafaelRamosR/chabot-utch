import express from 'express';
import compression from 'compression'; 
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import { IApiConfig } from './interfaces/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use(cors({
  allowedHeaders : ['Content-Type', 'Authorization'],
  origin         : config.get<IApiConfig>('API').ACCESS_ORIGIN,
  methods        : ['DELETE', 'GET', 'POST', 'PUT', 'UPDATE']
}));

app.use(config.get<IApiConfig>('API').API_VERSION, routes);

export default app;
