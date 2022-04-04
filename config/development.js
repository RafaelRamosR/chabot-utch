const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  API: {
    ACCESS_ORIGIN: '*',
    API_VERSION: '/api/v1',
    PORT: 8080,
  },
  DIALOG_FLOW: {
    DF_LANGUAGE_CODE: 'es',
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    GOOGLE_PROJECT_ID: 'bot-test-riip',
  },
  FEEDBACK_MESSAGE: '¿Esta respuesta satisface tu inquietud? 👉👈',
  RESPONSE_WITH_FEEDBACK: [
    'CAREER_CONTEXT',
    'CERTIFICATE_CONTEXT',
    'ENROLLMENT_CONTEXT',
    'PLATFORM_CONTEXT',
    'PROCEDURE_CONTEXT',
  ],
  TWILIO: {
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    TWILIO_NUMBER_PHONE: '14155238886',
  },
};
