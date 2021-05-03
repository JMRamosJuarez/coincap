export enum FailureType {
  UNKNOWN_ERROR,
  API_REQUEST_ERROR,
  API_RESPONSE_ERROR,
  EMPTY_ASSETS,
  INVALID_ASSET_ID,
  ASSET_NOT_FOUND,
}

export interface Failure {
  type: FailureType;
  message?: string;
}
