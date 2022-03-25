type InformationContent = {
  id: string;
  code: string;
  mainQuestion?: string;
  messages: string[];
};

type InfoSchema = {
  CAREER_CONTEXT: InformationContent[];
  CERTIFICATE_CONTEXT: InformationContent[];
  ENROLLMENT_CONTEXT: InformationContent[];
  GENERAL_CONTEXT: InformationContent[];
  PLATFORM_CONTEXT: InformationContent[];
  PROCEDURE_CONTEXT: InformationContent[];
};

type LogSchema = {
  id: string;
  code: string;
  errorMessage: string;
  url: string;
  userMessage: string;
  userPhoneNumber: string;
};

export type DatabaseSchema = {
  info: InfoSchema;
  log: LogSchema[];
};

export const initialSchema = {
  info: [],
  log: [],
}
