import {AxiosError} from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';
import {moviesApi} from '../../api';
import {MovieResponse} from '../../type';

// movie query 호출
export const usePlayingQuery = () => {
  return useQuery<MovieResponse, AxiosError>(
    // key 값 지정
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

// queries를 통해 동시에 호출 가능, suspense 예방
// export const multiQuery = () => {
//   return useQueries([
//     {queryKey: ['movies', 'nowPlaying'], queryFn: moviesApi.nowPlaying},
//     {queryKey: ['movies', 'trending'], queryFn: moviesApi.trending},
//   ]);
// };

// infinite query를 활용해 scroll 구현
export const useUpcomingQuery = () => {
  return useInfiniteQuery<MovieResponse, AxiosError>(
    ['movies', 'upcoming'],
    moviesApi.upcoming,
    {
      // currentPage param은 전달된 data 값이라고 보면 됩니다.
      getNextPageParam: currentPage => {
        const nextPage = currentPage.page + 1;

        return nextPage > currentPage.total_pages ? null : currentPage.page + 1;
      },
    },
  );
};
