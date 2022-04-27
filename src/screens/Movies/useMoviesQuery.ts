import {AxiosError} from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';
import {moviesApi} from '../../api';
import {MovieResponse} from '../../type';

export const usePlayingQuery = () => {
  return useQuery<MovieResponse, AxiosError>(
    ['movies', 'nowPlaying'],
    moviesApi.nowPlaying,
  );
};

export const useTrendingQuery = () => {
  return useQuery<MovieResponse, AxiosError>(
    ['movies', 'trending'],
    moviesApi.trending,
  );
};

export const useUpcomingQuery = () => {
  return useInfiniteQuery<MovieResponse, AxiosError>(
    ['movies', 'upcoming'],
    moviesApi.upcoming,
    {
      getNextPageParam: currentPage => {
        const nextPage = currentPage.page + 1;

        return nextPage > currentPage.total_pages ? null : currentPage.page + 1;
      },
    },
  );
};