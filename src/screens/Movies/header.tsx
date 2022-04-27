import React from 'react';
import styled from 'styled-components/native';
import HList from '../../components/HList';
import Loader from '../../components/Loader';
import SwiperComponent from './swiper';
import {usePlayingQuery, useTrendingQuery} from './useMoviesQuery';

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const MovieHeaderComponent = () => {
  const {isLoading: nowLoading, data: nowPlayingData} = usePlayingQuery();
  const {isLoading: trendLoading, data: trendingData} = useTrendingQuery();

  return nowLoading || trendLoading ? (
    <Loader />
  ) : (
    <React.Fragment>
      {nowPlayingData && <SwiperComponent nowPlayingData={nowPlayingData} />}
      {trendingData && (
        <HList title="Treding Movies" data={trendingData.results} />
      )}
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
    </React.Fragment>
  );
};

export default MovieHeaderComponent;
