export interface IApiConfig {
  ACCESS_ORIGIN: string | string[];
  API_VERSION: string;
  PORT: number;
}

export interface ITwilioConfig {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
  TWILIO_NUMBER_PHONE: string;
}

export interface IDialogFlowConfig {
  DF_LANGUAGE_CODE: string;
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_PROJECT_ID: string;
}

export interface IDialogFlowMotors {
  MOTOR_ONE: IDialogFlowConfig;
  MOTOR_TWO: IDialogFlowConfig;
}
