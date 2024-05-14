import React, { useEffect, useMemo, useRef, useState } from 'react';

import ClearInputIcon from '@assets/svg/clear-input.svg';
import SearchIcon from '@assets/svg/search.svg';
import { styles } from '@coin_assets/presentation/components/SearchInput/styles';
import {
  useGetCoinAssetsAction,
  useSearchCoinAssetsAction,
} from '@coin_assets/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchInput: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const input = useRef<TextInput>(null);

  const { colors } = useAppTheme();

  const search = useSearchCoinAssetsAction();

  const getAssets = useGetCoinAssetsAction();

  const [query, updateQuery] = useState<string>('');

  const opacity = useMemo(() => {
    return query.length >= 3 ? 1 : 0;
  }, [query]);

  useEffect(() => {
    if (query.length >= 3) {
      search(query);
    }
  }, [query, search]);

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: top,
          backgroundColor: colors.primary['950'],
        },
      ]}>
      <SearchIcon style={styles.searchIcon} stroke={colors.primary['500']} />
      <TextInput
        ref={input}
        cursorColor={colors.red['500']}
        style={[
          styles.input,
          {
            color: colors.primary['50'],
          },
        ]}
        blurOnSubmit
        returnKeyType={'search'}
        placeholder={'Search'}
        placeholderTextColor={colors.primary['500']}
        value={query}
        onChangeText={text => updateQuery(text.trim())}
      />
      <TouchableOpacity
        disabled={query.length < 3}
        style={[styles.clear, { opacity }]}
        onPress={() => {
          input.current?.blur();
          updateQuery('');
          getAssets({ page: 0, limit: 50 });
        }}>
        <ClearInputIcon stroke={colors.primary['500']} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
