import { Request, Response, NextFunction } from 'express';
// import { sendTextMessage } from '../../services/twilio';

export async function whatsappSendMessage(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log('req -> ', request.body);
  } catch (error) {
    return next(error);
  }
}
