import HttpClient from '@core/domain/access/http_client';

export default interface CoreModule {
  readonly coincapHttpClient: HttpClient;
}
