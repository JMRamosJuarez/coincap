export enum AppErrorType {
  UNKNOWN_ERROR = 'unknown_error',
  UNEXPECTED_ERROR = 'unexpected_error',
  API_RESPONSE_ERROR = 'api_response_error',
  API_REQUEST_ERROR = 'api_request_error',
  API_REQUEST_CANCELED = 'api_request_canceled',
  INVALID_STATE_ACCESS = 'invalid_state_access',
}

export default class AppError {
  readonly name: string;

  constructor(readonly type: AppErrorType, readonly message?: string) {
    this.name = 'AppError';
  }
}
