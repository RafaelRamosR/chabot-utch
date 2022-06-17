import { SessionsClient } from '@google-cloud/dialogflow';
import { nanoid } from 'nanoid';
import config from 'config';
import {
  IDialogFlowConfig,
  IDialogFlowMotors,
  IAResponseContext,
  IIAResponse,
} from '../../interfaces';

const dialogFlowClientFactory = (
  motorNumberText: 'one' | 'two'
): SessionsClient => {
  const iaMotorConfig: IDialogFlowConfig =
    config.get<IDialogFlowMotors>('DIALOG_FLOW')[
      `MOTOR_${motorNumberText.toUpperCase()}`
    ];
  return new SessionsClient({
    projectId: iaMotorConfig.GOOGLE_PROJECT_ID,
    credentials: {
      client_email: iaMotorConfig.GOOGLE_CLIENT_EMAIL,
      private_key: iaMotorConfig.GOOGLE_PRIVATE_KEY,
    },
  });
};

const createRequest = (message: string, sessionPath: string) => {
  return {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'es',
      },
    },
  };
};

export async function sendToDialogFlow(
  message: string,
  session: string = nanoid(),
  iaMotor: 'one' | 'two' = 'two'
): Promise<string | IIAResponse> {
  if (!message) {
    return { context: 'GENERAL_CONTEXT', payload: 'MESSAGE_WITHOUT_BODY' };
  }

  const sessionClient = dialogFlowClientFactory(iaMotor);
  const sessionPath = sessionClient.projectAgentSessionPath(
    config.get<IDialogFlowConfig>('DIALOG_FLOW')[
      `MOTOR_${iaMotor.toUpperCase()}`
    ].GOOGLE_PROJECT_ID,
    session
  );
  const request = createRequest(message, sessionPath);
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentMessages[0];

  if (result.text) return result.text.text[0];

  const { context, payload } = result.payload.fields;

  if (context.stringValue === 'UNKNOWN') {
    return sendToDialogFlow(message, session, 'one');
  }

  return {
    context: context.stringValue as IAResponseContext,
    payload: payload.stringValue,
  };
}
