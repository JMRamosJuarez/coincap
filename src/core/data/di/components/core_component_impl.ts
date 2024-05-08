import CoinAssetsComponentImpl from '@coin_assets/data/di/components/coin_assets_component_impl';
import CoinAssetsModuleImpl from '@coin_assets/data/di/modules/coin_assets_module_impl';
import CoinAssetsComponent from '@coin_assets/domain/di/components/coin_assets_component';
import CoinAssetsModule from '@coin_assets/domain/di/modules/coin_assets_module';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';

export default class CoreComponentImpl implements CoreComponent {
  private _coinAssetsComponent?: CoinAssetsComponent;

  constructor(private readonly coreModule: CoreModule) {}

  get coinAssetsComponent(): CoinAssetsComponent {
    if (!this._coinAssetsComponent) {
      const module: CoinAssetsModule = new CoinAssetsModuleImpl(
        this.coreModule,
      );
      this._coinAssetsComponent = new CoinAssetsComponentImpl(module);
    }
    return this._coinAssetsComponent;
  }
}
