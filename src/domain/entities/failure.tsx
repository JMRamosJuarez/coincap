export enum FailureType {
  UNKNOWN_ERROR,
  API_REQUEST_ERROR,
  API_RESPONSE_ERROR,
  EMPTY_ASSETS,
}

export interface Failure {
  type: FailureType;
  message?: string;
}
