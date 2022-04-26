import {useQuery} from 'react-query';
import {moviesApi} from '../../api';

export const usePlayingQuery = () => {
  return useQuery(['movies', 'nowPlaying'], moviesApi.nowPlaying);
};

export const useTrendingQuery = () => {
  return useQuery(['movies', 'trending'], moviesApi.trending);
};
