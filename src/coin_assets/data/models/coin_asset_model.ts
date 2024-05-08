type CoinAssetModel = {
  readonly id?: string;
  readonly rank?: string;
  readonly symbol?: string;
  readonly name?: string;
  readonly supply?: string;
  readonly maxSupply?: string;
  readonly marketCapUsd?: string;
  readonly volumeUsd24Hr?: string;
  readonly priceUsd?: string;
  readonly changePercent24Hr?: string;
  readonly vwap24Hr?: string;
  readonly explorer?: string;
};

export default CoinAssetModel;
