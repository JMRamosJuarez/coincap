import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import axios, { AxiosError } from 'axios';

export type GenericError = unknown | Error | AxiosError | AppError;

export const instanceOfAppError = (error: GenericError): error is AppError => {
  return (
    error !== null &&
    error !== undefined &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'AppError' &&
    'type' in error
  );
};

export const instanceOfAxiosError = (
  error: GenericError,
): error is AxiosError => {
  if (error && typeof error === 'object') {
    return axios.isAxiosError(error);
  }
  return false;
};

export const instanceOfError = (error: GenericError): error is Error => {
  if (error && typeof error === 'object') {
    return 'name' in error && 'message' in error && 'stack' in error;
  }
  return false;
};

export const parseAxiosError = (axiosError?: AxiosError): AppError => {
  if (axiosError && axiosError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    //@ts-ignore
    const response: { readonly error?: string } = axiosError.response;
    return new AppError(
      AppErrorType.API_RESPONSE_ERROR,
      response?.error ||
        'The request was made and the server responded with a status code that falls out of the range of 2xx.',
    );
  } else if (axiosError && axiosError.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return new AppError(
      AppErrorType.API_REQUEST_ERROR,
      'The request was made but no response was received.',
    );
  } else if (axiosError) {
    // Something happened in setting up the request that triggered an Error
    return new AppError(
      AppErrorType.API_REQUEST_CANCELED,
      'Something happened in setting up the request that triggered an Error.',
    );
  }
  return new AppError(
    AppErrorType.UNKNOWN_ERROR,
    'Unable to process axios error',
  );
};

export const parseAppError = (error: GenericError): AppError => {
  if (instanceOfAppError(error)) {
    return error;
  }

  if (instanceOfAxiosError(error)) {
    return parseAxiosError(error);
  }

  if (instanceOfError(error)) {
    return new AppError(AppErrorType.UNEXPECTED_ERROR, error.message);
  }

  return new AppError(AppErrorType.UNKNOWN_ERROR);
};
