import CoinCapAsset from '../src/domain/entities/coin_cap_asset';
import { Failure, FailureType } from '../src/domain/entities/failure';
import CoinCapRepository from '../src/domain/repositories/coin_cap_repository';
import GetAssetDetailUseCase from '../src/domain/use_cases/get_asset_detail_use_case';

describe('GetAssetDetailUseCase', () => {
  const successResponse: CoinCapAsset = {
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
  };

  const repository: jest.Mocked<CoinCapRepository> = {
    getAssets: jest.fn(),
    getAssetDetail: jest.fn(),
  };

  beforeAll(() => {
    repository.getAssetDetail.mockResolvedValueOnce(successResponse);
  });

  test('GetAssetDetailUseCase should throw a failure of type FailureType.INVALID_ASSET_ID.', async () => {
    try {
      const getAssetDetailUseCase = new GetAssetDetailUseCase(repository);
      await getAssetDetailUseCase.execute();
    } catch (error) {
      const failure: Failure = error;

      const emptyResponseError: Failure = {
        type: FailureType.INVALID_ASSET_ID,
      };

      expect(failure.type).toEqual(emptyResponseError.type);
    }
  });

  test('GetAssetDetailUseCase should return an inmutable object of type CoinCapAsset.', async () => {
    const getAssetDetailUseCase = new GetAssetDetailUseCase(repository);
    const response = await getAssetDetailUseCase.execute('bitcoin');
    expect(response).toEqual(successResponse);
  });
});
