type MarketModel = {
  readonly exchangeId?: string;
  readonly baseId?: string;
  readonly quoteId?: string;
  readonly baseSymbol?: string;
  readonly quoteSymbol?: string;
  readonly volumeUsd24Hr?: string;
  readonly priceUsd?: string;
  readonly volumePercent?: string;
};

export default MarketModel;
