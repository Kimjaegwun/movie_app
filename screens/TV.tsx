import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import {tvApi} from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const TV = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading: todayLoading, data: todayData} = useQuery(
    ['tv', 'today'],
    tvApi.airingToday,
  );

  const {isLoading: topLoading, data: topData} = useQuery(
    ['tv', 'top'],
    tvApi.topRated,
  );

  const {isLoading: trendingLoading, data: trendingData} = useQuery(
    ['tv', 'trending'],
    tvApi.trending,
  );

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
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default TV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
