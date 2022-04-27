import axios from 'axios';
import {MovieFetchers, TVFetchers} from './type';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '10923b261ba94d897ac6b81148314a3f';

const axiosInstancs = axios.create({
  baseURL: `${BASE_URL}`,
  params: {
    api_key: API_KEY,
  },
});

export const moviesApi: MovieFetchers = {
  trending: () =>
    axiosInstancs.get('trending/movie/week').then(res => res.data),
  upcoming: ({pageParam}) => {
    return axiosInstancs
      .get(`/movie/upcoming?language=en-US&page=${pageParam}`)
      .then(res => res.data);
  },
  nowPlaying: () => {
    return axiosInstancs
      .get('/movie/now_playing?language=en-US&page=1')
      .then(res => res.data);
  },
  search: ({queryKey}) => {
    const [_, query] = queryKey;
    return axiosInstancs
      .get(`/search/movie?language=en-US&page=1&query=${query}`)
      .then(res => res.data);
  },
  detail: ({queryKey}) => {
    const [_, id] = queryKey;
    return axiosInstancs
      .get(`/movie/${id}?append_to_response=videos,images`)
      .then(res => res.data);
  },
};

export const tvApi: TVFetchers = {
  trending: () => {
    return axiosInstancs.get('/trending/tv/week').then(res => res.data);
  },
  airingToday: () => {
    return axiosInstancs.get('/tv/airing_today').then(res => res.data);
  },
  topRated: () => {
    return axiosInstancs.get('/tv/top_rated').then(res => res.data);
  },
  search: ({queryKey}) => {
    const [_, query] = queryKey;
    return axiosInstancs
      .get(`/search/tv?language=en-US&page=1&query=${query}`)
      .then(res => res.data);
  },
  detail: ({queryKey}) => {
    const [_, id] = queryKey;
    return axiosInstancs
      .get(`/tv/${id}?append_to_response=videos,images`)
      .then(res => res.data);
  },
};
