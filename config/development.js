const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    API: {
        ACCESS_ORIGIN: '*',
        API_VERSION: 'api/v1',
        PORT: 8080
    },
    TWILIO: {
        ACCOUNT_SID: process.env.ACCOUNT_SID,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
        TWILIO_NUMBER_PHONE: '14155238886'
    }
}