export enum FailureType {
  api_request_error,
  api_response_error,
}

export interface Failure extends Error {
  type: FailureType;
  name: string;
  message: string;
}
