import HttpClientImpl from '@core/data/access/http_client_impl';
import HttpClient from '@core/domain/access/http_client';
import CoreModule from '@core/domain/di/modules/core_module';
import { parseAppError } from '@core/domain/errors';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { Config } from 'react-native-config';

export default class CoreModuleImpl implements CoreModule {
  private _coincapHttpClient?: HttpClient;

  get coincapHttpClient(): HttpClient {
    if (!this._coincapHttpClient) {
      const axiosInstance = axios.create({
        baseURL: Config.COINCAP_BASE_URL,
        timeout: 60000 * 5,
      });

      axiosInstance.interceptors.request.use(config =>
        this.tokenInterceptor(config),
      );

      axiosInstance.interceptors.response.use(
        response => response,
        error => {
          throw parseAppError(error);
        },
      );

      this._coincapHttpClient = new HttpClientImpl(axiosInstance);
    }
    return this._coincapHttpClient;
  }

  private async tokenInterceptor(
    requestConfig: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    if (requestConfig.headers.Authorization) {
      return requestConfig;
    }
    requestConfig.headers.Authorization = `Bearer ${Config.COINCAP_TOKEN}`;
    return requestConfig;
  }
}
