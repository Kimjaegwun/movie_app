import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInfiniteQuery, useQueryClient} from 'react-query';

import Loader from '../../components/Loader';
import {Movie, MovieResponse, RootStackParamList} from '../../type';
import {moviesApi} from '../../api';
import MainPage from './main';
import produce from 'immer';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import HMedia from '../../components/HMedia';
import MovieHeaderComponent from './header';

type Props = NativeStackScreenProps<RootStackParamList, 'Movie'>;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<Props> = () => {
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ['movies', 'upcoming'],
    moviesApi.upcoming,
    {
      getNextPageParam: currentPage => {
        const nextPage = currentPage.page + 1;

        return nextPage > currentPage.total_pages ? null : currentPage.page + 1;
      },
    },
  );

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

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item: Movie) => {
    return item.id + '';
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleActive = useCallback((id: number) => {
    setUpcoming(
      produce(draft => {
        draft[id].active === undefined
          ? (draft[id].active = true)
          : draft[id].active
          ? (draft[id].active = false)
          : (draft[id].active = true);
      }),
    );
  }, []);

  const MainPageProps = {
    loadMore,
    onRefresh,
    refreshing,
    upcoming,
    movieKeyExtractor,
    handleActive,
  };

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
        const {poster_path, original_title, overview, release_date, active} =
          item;
        return (
          <HMedia
            posterPath={poster_path || ''}
            originalTitle={original_title}
            overview={overview}
            releaseDate={release_date}
            fullData={item}
            active={active}
            index={index}
            handleActive={handleActive}
          />
        );
      }}
      ListHeaderComponent={MovieHeaderComponent}
    />
  ) : null;
};

export default Movies;
