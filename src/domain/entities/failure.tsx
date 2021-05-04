export enum FailureType {
  UNKNOWN_ERROR,
  API_REQUEST_ERROR,
  API_RESPONSE_ERROR,
  EMPTY_ASSETS,
  INVALID_USE_CASE_REQUEST,
  ASSET_NOT_FOUND,
  EMPTY_ASSET_HISTORY,
}

export interface Failure {
  type: FailureType;
  message?: string;
}
