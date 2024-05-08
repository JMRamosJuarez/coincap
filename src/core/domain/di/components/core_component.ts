import CoinAssetsComponent from '@coin_assets/domain/di/components/coin_assets_component';

export default interface CoreComponent {
  readonly coinAssetsComponent: CoinAssetsComponent;
}
