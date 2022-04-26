import {QueryFunction} from 'react-query';

export interface MainStyle {
  theme: {mainBgColor: string; textColor: string};
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  active?: boolean;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface InfinityResponse {
  pages: MovieResponse[];
  pageParams: any;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

export type MovieListResponse = QueryFunction<MovieResponse>;

export type TVListResponse = QueryFunction<TVResponse>;

export interface MovieFetchers {
  trending: MovieListResponse;
  upcoming: MovieListResponse;
  nowPlaying: MovieListResponse;
  search: MovieListResponse;
  detail: QueryFunction<MovieDetails>;
}

export interface TVFetchers {
  trending: TVListResponse;
  airingToday: TVListResponse;
  topRated: TVListResponse;
  search: TVListResponse;
  detail: QueryFunction<TVDetails>;
}

export type RootStackParamList = {
  Movie: undefined;
};
