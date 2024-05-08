import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tooltip: {
    flexDirection: 'row',
    alignSelf: 'baseline',
  },
  arrowStyle: {
    width: 0,
    height: 0,
    borderTopWidth: 56 / 2,
    borderBottomWidth: 56 / 2,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  leftArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 56 / 2,
    borderBottomWidth: 56 / 2,

    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',

    borderRightWidth: 56 / 2,
    borderRightColor: 'white',
    borderLeftColor: 'transparent',
  },
  rightArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 56 / 2,
    borderBottomWidth: 56 / 2,

    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',

    borderLeftWidth: 56 / 2,
    borderLeftColor: 'white',
    borderRightColor: 'transparent',
  },
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  price: { lineHeight: 16 },
  date: { lineHeight: 16 },
});
