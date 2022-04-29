import {AxiosError} from 'axios';
import {useQuery} from 'react-query';
import {moviesApi, tvApi} from '../../api';
import {MovieDetails, TV, Movie, TVDetails} from '../../type';

// detail query 호출
export const useDetailQuery = (isMovie: boolean, params: Movie | TV) => {
  return useQuery<MovieDetails | TVDetails, AxiosError>(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
    {
      enabled: 'original_title' in params,
    },
  );
};
