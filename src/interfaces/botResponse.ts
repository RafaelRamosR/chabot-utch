export type IAResponseContext =
  | 'GENERAL_CONTEXT'
  | 'CAREER_CONTEXT'
  | 'CERTIFICATE_CONTEXT'
  | 'ENROLLMENT_CONTEXT'
  | 'PLATFORM_CONTEXT'
  | 'PROCEDURE_CONTEXT';

export interface IIAResponse {
  context: IAResponseContext;
  payload: string;
}
