import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import produce from 'immer';

import {Movie, RootStackParamList} from '../../type';
import {useUpcomingQuery} from './useMoviesQuery';
import Loader from '../../components/Loader';
import MovieHeaderComponent from './MovieHeader';
import MovieMain from './MovieMain';

type Props = NativeStackScreenProps<RootStackParamList, 'Movie'>;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<Props> = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useUpcomingQuery();

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  useEffect(() => {
    if (upcomingData) {
      const get = upcomingData.pages
        .map(page => {
          return page.results;
        })
        .flat();
      setUpcoming(get);
    }
  }, [upcomingData]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // moives를 key로 가지고 있는 query 모두 fetching
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item: Movie) => {
    return item.id + '';
  };

  const handleActive = useCallback((id: number) => {
    setUpcoming(
      produce(draft => {
        draft[id].active
          ? (draft[id].active = false)
          : (draft[id].active = true);
      }),
    );
  }, []);

  // queries 사용
  // const [playing, tranding] = multiQuery();

  return upcomingLoading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={3}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={({item, index}) => {
        const MainProps = {
          item,
          index,
          handleActive,
        };
        return <MovieMain {...MainProps} />;
      }}
      ListHeaderComponent={<MovieHeaderComponent />}
    />
  ) : null;
};

export default Movies;
