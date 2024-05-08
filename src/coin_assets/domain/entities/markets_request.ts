type MarketsRequest = {
  readonly coinAssetId: string;
  readonly page: number;
  readonly limit: number;
};

export default MarketsRequest;
