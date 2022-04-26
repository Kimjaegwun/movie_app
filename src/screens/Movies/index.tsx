import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInfiniteQuery, useQueryClient} from 'react-query';

import HMedia from '../../components/HMedia';
import Loader from '../../components/Loader';
import {usePlayingQuery, useTrendingQuery} from './useDetailQuery';
import {Movie, MovieResponse, RootStackParamList} from '../../type';
import {moviesApi} from '../../api';
import MainPage from './mainPage';

type Props = NativeStackScreenProps<RootStackParamList, 'Movie'>;

const Movies: React.FC<Props> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading: nowPlayingLoading, data: nowPlayingData} =
    usePlayingQuery();

  const {isLoading: trendingLoading, data: trendingData} = useTrendingQuery();

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

  const renderHMedia = ({item}: {item: Movie}) => (
    <HMedia
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item: Movie) => {
    return item.id + '';
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const MainPageProps = {
    loadMore,
    onRefresh,
    refreshing,
    upcomingData,
    movieKeyExtractor,
    renderHMedia,
    nowPlayingData,
    trendingData,
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <MainPage {...MainPageProps} />
  ) : null;
};

export default Movies;
