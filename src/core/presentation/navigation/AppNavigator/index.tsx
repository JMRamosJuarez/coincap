import React from 'react';

import CoinAssetDetailHeader from '@coin_assets/presentation/components/CoinAssetDetailHeader';
import CoinAssetDetailScreen from '@coin_assets/presentation/screens/CoinAssetDetail';
import CoinAssetsScreen from '@coin_assets/presentation/screens/CoinAssets';
import { AppNavigationStack } from '@core/presentation/navigation/AppNavigator/config';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';
import { hide } from 'react-native-bootsplash';

const AppNavigator: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <NavigationContainer
      onReady={() => {
        hide({ fade: true });
      }}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.primary['900'],
        },
      }}>
      <AppNavigationStack.Navigator
        initialRouteName={'CoinAssets'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}>
        <AppNavigationStack.Screen
          name={'CoinAssets'}
          component={CoinAssetsScreen}
        />
        <AppNavigationStack.Screen
          name={'CoinAssetDetail'}
          options={({
            route: {
              params: { coinAsset },
            },
          }) => ({
            title: `${coinAsset?.name || '----'} (${
              coinAsset?.symbol || '--'
            })`,
            headerShown: true,
            header: CoinAssetDetailHeader,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
          component={CoinAssetDetailScreen}
        />
      </AppNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
