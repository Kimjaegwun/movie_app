import {AxiosError} from 'axios';
import {useQuery} from 'react-query';
import {tvApi} from '../../api';
import {TVResponse} from '../../type';

export const useTodayTVQuery = () => {
  return useQuery<TVResponse, AxiosError>(['tv', 'today'], tvApi.airingToday);
};

export const useTopRateQuery = () => {
  return useQuery<TVResponse, AxiosError>(['tv', 'top'], tvApi.topRated);
};

export const useTrendingTVQuery = () => {
  return useQuery(['tv', 'trending'], tvApi.trending);
};
