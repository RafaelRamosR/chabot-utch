import { Request, Response, NextFunction } from 'express';
import { sendTextMessage } from '../../services/twilio';
import { sendToDialogFlow } from '../../services/dialogFlow';
import { getConnection } from '../../db';

export async function whatsappSendMessage(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { Body, WaId } = request.body;
    const { fulfillmentText } = await sendToDialogFlow(Body);

    const { messages } = getConnection()
      .get('info')
      .find({ code: fulfillmentText })
      .value();

    for (const message of messages) {
      await sendTextMessage(WaId, message.replace(/\\n/g, '\n'));
    }

    response.json({ ok: 200 });
  } catch (error) {
    return next(error);
  }
}
