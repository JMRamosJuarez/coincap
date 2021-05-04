import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  CoinCapAppDispatch,
  getAssetHistoryAction,
  CoinCapAppState,
} from '../redux/reducers/app_reducers';

import { LineChart } from 'react-native-chart-kit';

import moment from 'moment';
import { tryParseNumber } from '../../data/utils/utils';
import AssetListViewItem from '../widgets/asset_list_view_item';
import AssetHistoryItem from '../../domain/entities/asset_history_item';
import GetAssetHistoryRequest from '../../domain/entities/get_asset_history_request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

type AssetChartProps = {
  historyData: AssetHistoryItem[];
};

const AssetChart: React.FC<AssetChartProps> = ({
  historyData,
}: AssetChartProps) => {
  const dimensions = useWindowDimensions();
  return (
    <LineChart
      data={{
        labels: historyData.map(item => moment(item.time).format('HH:mm a')),
        datasets: [
          {
            data: historyData.map(item => item.priceUsd),
          },
        ],
      }}
      formatYLabel={yValue =>
        tryParseNumber(yValue).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      }
      yLabelsOffset={4}
      width={dimensions.width * 5} // from react-native
      height={256}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      bezier
    />
  );
};

const AssetHistoryScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParams, 'AssetDetail'>>();
  const asset = route.params.asset;

  const dispatch = useDispatch<CoinCapAppDispatch>();

  useEffect(() => {
    const start = moment()
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .add(-1, 'days')
      .valueOf();
    const end = moment().minutes(0).seconds(0).milliseconds(0).valueOf();
    const request: GetAssetHistoryRequest = {
      assetId: asset.id,
      interval: 'h1',
      start: start,
      end: end,
    };
    dispatch(getAssetHistoryAction(request));
  }, [dispatch, asset.id]);

  const assetHistoryState = useSelector(
    (state: CoinCapAppState) => state.appReducer.assetHistoryState,
  );

  switch (assetHistoryState.type) {
    case 'waiting_state':
    case 'loading_state':
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    case 'error_state': {
      const { error } = assetHistoryState;
      return (
        <View style={styles.centerContainer}>
          <Text>{error.message}</Text>
        </View>
      );
    }
    case 'asset_history_state': {
      const historyData = assetHistoryState.data;
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <AssetListViewItem asset={asset} />
          <ScrollView style={{ flex: 1 }} horizontal>
            <AssetChart historyData={historyData} />
          </ScrollView>
        </View>
      );
    }
    default:
      return (
        <View style={styles.centerContainer}>
          <Text>Default state</Text>
        </View>
      );
  }
};

export default AssetHistoryScreen;
