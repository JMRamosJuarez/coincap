import 'react-native-gesture-handler';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';

import {
  CoinCapAppDispatch,
  globalStore,
  updatePricesActionCreator,
} from './presentation/redux/reducers/app_reducers';

import CoinCapAssetsScreen from './presentation/screens/coin_cap_assets_screen';

const Stack = createStackNavigator();

const AppComponent: React.FC = () => {
  const dispatch = useDispatch<CoinCapAppDispatch>();
  useEffect(() => {
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
    pricesWs.onmessage = msg => {
      const jsonData = JSON.parse(msg.data);
      dispatch(updatePricesActionCreator(jsonData));
    };
    return () => pricesWs.close();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="tasks_screen">
        <Stack.Screen
          name="assets_screen"
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
