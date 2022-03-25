import { SessionsClient } from '@google-cloud/dialogflow';
import { nanoid } from 'nanoid';
import config from 'config';
import { IDialogFlowConfig } from '../../interfaces/config';
import { IAResponseContext, IIAResponse } from '../../interfaces/botResponse';

const dialogFlowClient = (): SessionsClient => {
  return new SessionsClient({
    projectId: config.get<IDialogFlowConfig>('DIALOG_FLOW').GOOGLE_PROJECT_ID,
    credentials: {
      client_email:
        config.get<IDialogFlowConfig>('DIALOG_FLOW').GOOGLE_CLIENT_EMAIL,
      private_key:
        config.get<IDialogFlowConfig>('DIALOG_FLOW').GOOGLE_PRIVATE_KEY,
    },
  });
};

export async function sendToDialogFlow(
  message: string,
  session: string = nanoid()
): Promise<string | IIAResponse> {
  if (!message) {
    return { context: 'GENERAL_CONTEXT', payload: 'MESSAGE_WITHOUT_BODY' };
  }

  const sessionClient = dialogFlowClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    config.get<IDialogFlowConfig>('DIALOG_FLOW').GOOGLE_PROJECT_ID,
    session
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode:
          config.get<IDialogFlowConfig>('DIALOG_FLOW').DF_LANGUAGE_CODE,
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentMessages[0];

  if (result.text) return result.text.text[0];

  const { context, payload } = result.payload.fields;

  return {
    context: context.stringValue as IAResponseContext,
    payload: payload.stringValue,
  };
}
