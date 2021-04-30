import CoinCapAsset from '../src/domain/entities/coin_cap_asset';
import { Failure, FailureType } from '../src/domain/entities/failure';
import CoinCapRepository from '../src/domain/repositories/coin_cap_repository';
import GetAssetsUseCase from '../src/domain/use_cases/get_assets_use_case';

describe('GetAssetsUseCase', () => {
  const successResponse: CoinCapAsset[] = [
    {
      id: 'bitcoin',
      rank: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      supply: 18695412.0,
      maxSupply: 21000000.0,
      marketCapUsd: 1063868389801.783125158534112,
      volumeUsd24Hr: 11251359121.09805306932789691,
      priceUsd: 56905.319326569701976,
      changePercent24Hr: 7.3164507900063713,
      vwap24Hr: 55203.2823559383717632,
      explorer: 'https://blockchain.info/',
    },
  ];

  const repository: jest.Mocked<CoinCapRepository> = {
    getAssets: jest.fn(),
  };

  beforeAll(() => {
    repository.getAssets.mockResolvedValueOnce([]);
    repository.getAssets.mockResolvedValueOnce(successResponse);
  });

  test('GetAssetsUseCase should throw a failure of type FailureType.empty_assets.', async () => {
    try {
      const getAssetsUseCase = new GetAssetsUseCase(repository);
      await getAssetsUseCase.execute();
    } catch (error) {
      const failure: Failure = error;

      const emptyResponseError: Failure = {
        type: FailureType.empty_assets,
      };

      expect(failure.type).toEqual(emptyResponseError.type);
    }
  });

  test('GetAssetsUseCase should return an inmutable array of CoinCapAsset objects.', async () => {
    const getAssetsUseCase = new GetAssetsUseCase(repository);
    const response = await getAssetsUseCase.execute();
    expect(response).toEqual(successResponse);
  });
});
