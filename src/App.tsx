import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import { globalStore } from './presentation/redux/reducers/app_reducers';

import CoinCapAssetsScreen from './presentation/screens/coin_cap_assets_screen';

const Stack = createStackNavigator();

const App: React.FC = () => (
  <Provider store={globalStore}>
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
  </Provider>
);

export default App;
