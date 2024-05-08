type CoinAsset = {
  readonly id: string;
  readonly rank: number;
  readonly symbol: string;
  readonly name: string;
  readonly supply: {
    readonly current: number;
    readonly max: number;
  };
  readonly marketCap: number;
  readonly volume24Hr: number;
  readonly price: number;
  readonly changePercent24Hr: number;
  readonly vwap24Hr: number;
  readonly explorer: string;
  readonly timestamp: number;
};

export default CoinAsset;
