export enum FailureType {
  api_request_error,
  api_response_error,
  empty_assets,
}

export interface Failure {
  type: FailureType;
  message?: string;
}
