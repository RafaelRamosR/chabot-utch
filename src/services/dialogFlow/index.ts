import { SessionsClient } from '@google-cloud/dialogflow';
import { nanoid } from 'nanoid';
import config from 'config';
import {
  IDialogFlowConfig,
  IAResponseContext,
  IIAResponse,
} from '../../interfaces';

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

const createRequest = (message: string, sessionPath: string) => {
  return {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode:
          config.get<IDialogFlowConfig>('DIALOG_FLOW').DF_LANGUAGE_CODE,
      },
    },
  };
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
  const request = createRequest(message, sessionPath);
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentMessages[0];

  if (result.text) return result.text.text[0];

  const { context, payload } = result.payload.fields;

  return {
    context: context.stringValue as IAResponseContext,
    payload: payload.stringValue,
  };
}
