import twilio from 'twilio';
import config from 'config';
import { IMessageOption, ITwilioConfig } from '../../interfaces';

const twilioInstance = () =>
  twilio(
    config.get<ITwilioConfig>('TWILIO').ACCOUNT_SID,
    config.get<ITwilioConfig>('TWILIO').AUTH_TOKEN
  );

const createMessageOptions = (
  numberSender: string,
  message: string | string[]
): IMessageOption => {
  const messageBody = Array.isArray(message)
    ? { body: message[0], mediaUrl: message[1] }
    : { body: message };
  const messageOptions = {
    ...messageBody,
    from: `whatsapp:+${
      config.get<ITwilioConfig>('TWILIO').TWILIO_NUMBER_PHONE
    }`,
    to: `whatsapp:+${numberSender}`,
  };
  return messageOptions;
};

export function sendTextMessage(
  numberSender: string,
  message: string | string[],
  origin: string | undefined
) {
  if (origin) return origin;

  const twilioClient = twilioInstance();
  const messageOptions = createMessageOptions(numberSender, message);

  return new Promise((resolve, reject) => {
    twilioClient.messages
      .create(messageOptions)
      .then((payload) => resolve(payload))
      .catch((error) => reject(error));
  });
}
