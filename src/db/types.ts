type InformationContent = {
  id: string;
  code: string;
  mainQuestion?: string;
  messages: string[] | [string[]];
  shortQuestion?: string;
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

type UnknownSchema = {
  id: string;
  message: string;
  origin: string;
  waId: string;
}

export type DatabaseSchema = {
  info: InfoSchema;
  log: LogSchema[];
  unknown: UnknownSchema[];
};

export const initialSchema = {
  info: {
    CAREER_CONTEXT: [],
    CERTIFICATE_CONTEXT: [],
    ENROLLMENT_CONTEXT: [],
    GENERAL_CONTEXT: [],
    PLATFORM_CONTEXT: [],
    PROCEDURE_CONTEXT: [],
  },
  log: [],
  unknown: [],
};
