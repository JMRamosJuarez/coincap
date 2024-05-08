import CoinAsset from '@coin_assets/domain/entities/coin_asset';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

export type AppStackParams = {
  CoinAssets: undefined;
  CoinAssetDetail: { readonly coinAsset: CoinAsset };
};

export type CoinAssetDetailRouteProp = RouteProp<
  AppStackParams,
  'CoinAssetDetail'
>;

export const AppNavigationStack = createStackNavigator<AppStackParams>();

export type AppNavigationProp = StackNavigationProp<AppStackParams>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
