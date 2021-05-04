import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';

import {
  CoinCapAppDispatch,
  globalStore,
  updatePricesAction,
} from './presentation/redux/reducers/app_reducers';

import CoinCapAssetsScreen from './presentation/screens/coin_cap_assets_screen';
import AssetHistoryScreen from './presentation/screens/asset_history_screen';
import CoinCapAsset from './domain/entities/coin_cap_asset';

export type RootStackParams = {
  Assets: undefined;
  AssetDetail: { asset: CoinCapAsset };
};

const Stack = createStackNavigator<RootStackParams>();

const AppComponent: React.FC = () => {
  const dispatch = useDispatch<CoinCapAppDispatch>();
  useEffect(() => {
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
    pricesWs.onmessage = msg => {
      const jsonData = JSON.parse(msg.data);
      dispatch(updatePricesAction(jsonData));
    };
    return () => pricesWs.close();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Assets">
        <Stack.Screen
          name="Assets"
          component={CoinCapAssetsScreen}
          options={() => ({
            title: 'CoinCap',
            headerShown: true,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          })}
        />
        <Stack.Screen
          name="AssetDetail"
          component={AssetHistoryScreen}
          options={() => ({
            title: 'History',
            headerShown: true,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={globalStore}>
      <AppComponent />
    </Provider>
  );
};

export default App;
