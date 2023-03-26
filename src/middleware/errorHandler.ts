import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getConnection } from '../db';

export default function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) {
  
  const newLog = {
    id: nanoid(),
    code: error.name,
    errorMessage: JSON.stringify(error),
    url: request.originalUrl,
    userMessage: request.body.Body || 'NOT MESSAGE',
    userPhoneNumber: request.body.WaId || 'NOT NUMBER',
  };
  getConnection().get('log').push(newLog).write();
  response.status(500).json({ error: true });
}
