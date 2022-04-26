import {useQuery} from 'react-query';
import {moviesApi} from '../../api';

export const usePlayingQuery = () => {
  return useQuery(['movies', 'nowPlaying'], moviesApi.nowPlaying, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    refetchInterval: 10000,
  });
};

export const useTrendingQuery = () => {
  return useQuery(['movies', 'trending'], moviesApi.trending, {});
};
