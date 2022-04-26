import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import {useInfiniteQuery, useQuery, useQueryClient} from 'react-query';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

import {Movie, MovieResponse, moviesApi} from '../api';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import HList from '../components/HList';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const currentIndex = useRef(0);

  const {isLoading: nowPlayingLoading, data: nowPlayingData} =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying, {});

  const {isLoading: trendingLoading, data: trendingData} =
    useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending, {});

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

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const renderHMdia = ({item}: {item: Movie}) => (
    <HMedia
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + '';

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log('start');

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={3}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcomingData?.pages
        .map(page => {
          return page.results;
        })
        .flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMdia}
      ListHeaderComponent={() => (
        <React.Fragment>
          <Swiper
            horizontal
            showsButtons={false}
            showsPagination={true}
            containerStyle={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT / 4,
              marginBottom: 35,
            }}>
            {nowPlayingData?.results.map((movie: any) => {
              return (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ''}
                  posterPath={movie.poster_path || ''}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              );
            })}
          </Swiper>

          <HList title="Treding Movies" data={trendingData!.results} />

          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </React.Fragment>
      )}
    />
  ) : null;
};

export default Movies;
