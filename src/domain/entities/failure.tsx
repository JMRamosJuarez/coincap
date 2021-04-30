export enum FailureType {
  unknown_error,
  api_request_error,
  api_response_error,
  empty_assets,
}

export interface Failure {
  type: FailureType;
  message?: string;
}
