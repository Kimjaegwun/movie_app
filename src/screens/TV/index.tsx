import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import HList from '../../components/HList';
import Loader from '../../components/Loader';
import {
  useTodayTVQuery,
  useTopRateQuery,
  useTrendingTVQuery,
} from './useTVQuery';

const TV = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading: todayLoading, data: todayData} = useTodayTVQuery();

  const {isLoading: topLoading, data: topData} = useTopRateQuery();

  const {isLoading: trendingLoading, data: trendingData} = useTrendingTVQuery();

  const loading = todayLoading || topLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{paddingVertical: 30}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HList title="Trending TV" data={trendingData?.results} />
      <HList title="Airing Today" data={todayData?.results} />
      <HList title="Top Rated TV" data={topData?.results} />
    </ScrollView>
  );
};

export default TV;
