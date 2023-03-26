import { Request, Response, NextFunction } from 'express';
import config from 'config';

import { getShortQuestions, insertUnknownData } from './ops';
import { sendTextMessage } from '../../services/twilio';
import { sendToDialogFlow } from '../../services/dialogFlow';
import { getConnection } from '../../db';

export async function webhookSendMessage(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { Body, Origin, WaId } = request.body;
    const resultIA = await sendToDialogFlow(Body, WaId);

    if (typeof resultIA === 'string') {
      await sendTextMessage(WaId, resultIA, Origin);
      return response.json({
        multiple: false,
        message: resultIA,
        returnFeedback: false,
      });
    }

    const { context, payload } = resultIA;

    if (payload === 'DEFAULT_FALLBACK_INTENT') {      
      insertUnknownData({
        message: Body,
        origin: Origin,
        waId: WaId
      });
    }

    if (context === payload) {
      const shortQuestions = getShortQuestions(context);
      await sendTextMessage(WaId, shortQuestions, Origin);
      return response.json({
        multiple: false,
        message: shortQuestions,
        returnFeedback: false,
      });
    }

    const { messages } = getConnection()
      .get('info')
      .get(context)
      .find({ code: payload })
      .value();

    const returnFeedback = config
      .get<string[]>('RESPONSE_WITH_FEEDBACK')
      .includes(context);

    for (const message of messages) {
      await sendTextMessage(WaId, message, Origin);
    }

    response.json({
      multiple: true,
      messages,
      returnFeedback,
      feedbackMessage: config.get<string>('FEEDBACK_MESSAGE'),
    });
  } catch (error) {
    return next(error);
  }
}
