import { SessionsClient } from '@google-cloud/dialogflow';
import config from 'config';
import { IDialogFlowConfig } from '../../interfaces/config';

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

export async function sendToDialogFlow(message: string, session: string) {
  try {
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

    const result = responses[0].queryResult;

    // console.log('INTENT EMPAREJADO: ', result.intent.displayName);
    let defaultResponses = [];
    if (result.action !== 'input.unknown') {
      result.fulfillmentMessages.forEach((element) => {
        defaultResponses.push(element);
      });
    }
    if (defaultResponses.length === 0) {
      result.fulfillmentMessages.forEach((element) => {
        if (element.platform === 'PLATFORM_UNSPECIFIED') {
          defaultResponses.push(element);
        }
      });
    }
    result.fulfillmentMessages = defaultResponses;
    // console.log(JSON.stringify(result, null, ' '));
    return result;
  } catch (e) {
    console.log('error');
    console.log(e);
  }
}
