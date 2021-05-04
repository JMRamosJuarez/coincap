import AssetHistoryItem from '../src/domain/entities/asset_history_item';
import { Failure, FailureType } from '../src/domain/entities/failure';
import GetAssetHistoryRequest from '../src/domain/entities/get_asset_history_request';
import CoinCapRepository from '../src/domain/repositories/coin_cap_repository';
import GetAssetHistoryUseCase from '../src/domain/use_cases/get_asset_history_use_case';

describe('GetAssetDetailUseCase', () => {
  const emptyResponse: AssetHistoryItem[] = [];
  const successResponse: AssetHistoryItem[] = [
    {
      date: Date.now(),
      time: Date.now(),
      priceUsd: 1000,
    },
  ];

  const repository: jest.Mocked<CoinCapRepository> = {
    getAssets: jest.fn(),
    getAssetHistory: jest.fn(),
  };

  beforeAll(() => {
    repository.getAssetHistory.mockResolvedValueOnce(emptyResponse);
    repository.getAssetHistory.mockResolvedValueOnce(successResponse);
  });

  test('GetAssetHistoryUseCase should throw a failure of type FailureType.INVALID_USE_CASE_REQUEST.', async () => {
    try {
      const getAssetHistoryUseCase = new GetAssetHistoryUseCase(repository);
      await getAssetHistoryUseCase.execute();
    } catch (error) {
      const failure: Failure = error;

      const invalidRequestError: Failure = {
        type: FailureType.INVALID_USE_CASE_REQUEST,
      };

      expect(failure.type).toEqual(invalidRequestError.type);
    }
  });

  test('GetAssetHistoryUseCase should throw a failure of type FailureType.EMPTY_ASSET_HISTORY.', async () => {
    try {
      const getAssetHistoryUseCase = new GetAssetHistoryUseCase(repository);
      const request: GetAssetHistoryRequest = {
        assetId: 'bitcoin',
        interval: 'h1',
        start: 0,
        end: 0,
      };
      await getAssetHistoryUseCase.execute(request);
    } catch (error) {
      const failure: Failure = error;
      const emptyResponseError: Failure = {
        type: FailureType.EMPTY_ASSET_HISTORY,
      };
      expect(failure.type).toEqual(emptyResponseError.type);
    }
  });

  test('GetAssetHistoryUseCase should return an inmutable array of AssetHistoryItem objects.', async () => {
    const getAssetHistoryUseCase = new GetAssetHistoryUseCase(repository);
    const request: GetAssetHistoryRequest = {
      assetId: 'bitcoin',
      interval: 'h1',
      start: 0,
      end: 0,
    };
    const response = await getAssetHistoryUseCase.execute(request);
    expect(response).toEqual(successResponse);
  });
});
