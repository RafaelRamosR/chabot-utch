import { Request, Response, NextFunction } from 'express';
import { sendTextMessage } from '../../services/twilio';
import { sendToDialogFlow } from '../../services/dialogFlow';

export async function whatsappSendMessage(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { Body, WaId } = request.body;
    const { fulfillmentText } = await sendToDialogFlow(Body);

    const result = await sendTextMessage(WaId, fulfillmentText);
    console.log('Result: ', result);

    response.json({ ok: 200 });
  } catch (error) {
    return next(error);
  }
}
