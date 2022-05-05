import {AxiosError} from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';
import {moviesApi, tvApi} from '../../api';
import {MovieResponse, TVResponse} from '../../type';

export const useSearchMovieQuery = (value: string) => {
  return useQuery<MovieResponse, AxiosError>(
    ['searchMovies', value],
    moviesApi.search,
    {
      // enabled를 통해 입력할떄마다 fetching
      enabled: Boolean(value),
      // 이전 상태 유지
      keepPreviousData: true,
    },
  );
};

export const useSearchTVQuery = (value: string) => {
  return useQuery<TVResponse, AxiosError>(['searchTV', value], tvApi.search, {
    enabled: Boolean(value),
    keepPreviousData: true,
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
