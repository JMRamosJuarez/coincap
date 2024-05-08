import CoinHistoryItem from '@coin_assets/domain/entities/coin_history_item';

type CoinHistory = {
  readonly high: number;
  readonly low: number;
  readonly average: number;
  readonly change: number;
  readonly data: CoinHistoryItem[];
};

export default CoinHistory;
