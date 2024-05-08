import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 0.5,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  data: { flex: 1, marginHorizontal: 24, marginVertical: 8 },
  exchange: { fontSize: 16, lineHeight: 22 },
  price: { fontSize: 16, lineHeight: 22, fontWeight: 'bold' },
  symbol: { fontSize: 16, lineHeight: 22 },
  arrow: { padding: 12 },
  animated: { overflow: 'hidden' },
  animatedBody: {
    position: 'absolute',
    start: 0,
    end: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dataItem: { flex: 1 },
});
