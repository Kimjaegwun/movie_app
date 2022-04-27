import React from 'react';
import styled from 'styled-components/native';
import HList from '../../components/HList';
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
  const {data: nowPlayingData} = usePlayingQuery();
  const {data: trendingData} = useTrendingQuery();

  return (
    <React.Fragment>
      <SwiperComponent nowPlayingData={nowPlayingData} />
      <HList title="Treding Movies" data={trendingData?.results || []} />
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
    </React.Fragment>
  );
};

export default MovieHeaderComponent;
