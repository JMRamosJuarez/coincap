type Market = {
  readonly exchange: string;
  readonly id: {
    readonly base: string;
    readonly quote: string;
  };
  readonly symbol: {
    readonly base: string;
    readonly quote: string;
  };
  readonly volume: {
    readonly v24Hr: number;
    readonly percent: number;
  };
  readonly price: number;
};

export default Market;
