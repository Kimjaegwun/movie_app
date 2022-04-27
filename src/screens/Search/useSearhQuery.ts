import {AxiosError} from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';
import {moviesApi, tvApi} from '../../api';
import {MovieResponse, TVResponse} from '../../type';

export const useSearchMovieQuery = (value: string) => {
  return useQuery<MovieResponse, AxiosError>(
    ['searchMovies', value],
    moviesApi.search,
    {
      enabled: false,
    },
  );
};

export const useSearchTVQuery = (value: string) => {
  return useQuery<TVResponse, AxiosError>(['searchTV', value], tvApi.search, {
    enabled: false,
  });
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
