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
    const { Body, Origin, WaId } = request.body;
    const resultIA = await sendToDialogFlow(Body);

    if (typeof resultIA === 'string') {
      await sendTextMessage(WaId, resultIA, Origin);
      return response.json({ multiple: false, message: resultIA });
    }

    const { context, payload } = resultIA;
    const { messages } = getConnection()
      .get('info')
      .get(context)
      .find({ code: payload })
      .value();

    for (const message of messages) {
      await sendTextMessage(WaId, message, Origin);
    }

    response.json({ multiple: true, messages });
  } catch (error) {
    return next(error);
  }
}
