import { NextFunction, Request, Response } from 'express';

export default function saveSession(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { Body, Origin, WaId } = request.body;
  try {
    request.flash(WaId, JSON.stringify({ Body, Origin }));
    request.flash('WaId', WaId);
  } catch (error) {
    console.log(error);
  }
  next();
}
