import twilio from 'twilio';
import config from 'config';
import { ITwilioConfig } from '../../interfaces/config';

const twilioInstance = () =>
  twilio(
    config.get<ITwilioConfig>('TWILIO').ACCOUNT_SID,
    config.get<ITwilioConfig>('TWILIO').AUTH_TOKEN
  );

export function sendTextMessage(numberSender: string, message: string) {
  const twilioClient = twilioInstance();

  return new Promise((resolve, reject) => {
    twilioClient.messages
      .create({
        from: `whatsapp:+${
          config.get<ITwilioConfig>('TWILIO').TWILIO_NUMBER_PHONE
        }`,
        body: message,
        to: `whatsapp:+${numberSender}`,
      })
      .then((payload) => resolve(payload))
      .catch((error) => reject(error));
  });
}
