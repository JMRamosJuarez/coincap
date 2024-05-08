import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 0.5,
  },
  data: { flex: 1, marginHorizontal: 8 },
  name: { fontSize: 16, lineHeight: 22, fontWeight: 'bold' },
  symbol: { fontSize: 14, lineHeight: 18 },
  price: { fontSize: 16, lineHeight: 22, fontWeight: 'bold' },
});
