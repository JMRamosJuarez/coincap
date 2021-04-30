import { AxiosError } from 'axios';

import CoinCapErrorModel from '../models/coin_cap_error_model';

import { Failure, FailureType } from '../../domain/entities/failure';

export const axiosFailure = (
  axiosError: AxiosError<CoinCapErrorModel>,
): Failure => {
  if (axiosError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const responseMessage: CoinCapErrorModel = axiosError.response?.data ?? {
      error:
        'The request was made and the server responded with a status code that falls out of the range of 2xx.',
      timestamp: Date.now(),
    };
    return {
      type: FailureType.api_response_error,
      name: 'api_response_error',
      message: responseMessage.error,
    };
  } else if (axiosError.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      type: FailureType.api_request_error,
      name: 'api_request_error',
      message: 'The request was made but no response was received.',
    };
  } else {
    // Something happened in setting up the request that triggered an Error.
    return {
      type: FailureType.api_request_error,
      name: 'api_request_error',
      message: `Something happened in setting up the request that triggered an Error, details: ${axiosError.message}.`,
    };
  }
};

export const tryParseNumber = (value: string): number => {
  const result = parseFloat(value);
  return Number.isNaN(result) ? 0 : result;
};
