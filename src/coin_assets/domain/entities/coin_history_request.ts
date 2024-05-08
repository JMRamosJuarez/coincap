export type CoinHistoryTime = {
  readonly id: string;
  readonly period: {
    readonly start: number;
    readonly end: number;
  };
  readonly interval:
    | 'm1'
    | 'm5'
    | 'm15'
    | 'm30'
    | 'h1'
    | 'h2'
    | 'h6'
    | 'h12'
    | 'd1';
};

type CoinHistoryRequest = {
  readonly coinAssetId: string;
  readonly time: CoinHistoryTime;
};

export default CoinHistoryRequest;
