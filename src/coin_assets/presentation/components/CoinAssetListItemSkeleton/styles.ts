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
  title: { marginVertical: 3 },
  symbol: { marginVertical: 2 },
  price: { marginVertical: 3 },
});
