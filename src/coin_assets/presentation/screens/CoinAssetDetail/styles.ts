import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  asset: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  name: { fontWeight: 'bold' },
  price: { textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  priceLabel: { textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  dataItem: { flex: 1, margin: 12 },
  timeSelector: { marginHorizontal: 24, marginVertical: 12 },
});
