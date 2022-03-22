import twilio from 'twilio';

const ACCOUNT_SID = 'X';
const AUTH_TOKEN = 'Y';
const TWILIO_NUMBER_PHONE = '14155238886';
const twilioInstance = () => twilio(ACCOUNT_SID, AUTH_TOKEN);

export function sendTextMessage(numberSender: string, message: string) {
  const twilioClient = twilioInstance();

  return new Promise((resolve, reject) => {
    twilioClient.messages
      .create({
        from: `whatsapp:+${TWILIO_NUMBER_PHONE}`,
        body: message,
        to: `whatsapp:+${numberSender}`,
      })
      .then(payload => resolve(payload))
      .catch(error => reject(error));
  });
}
