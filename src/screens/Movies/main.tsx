import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import HList from '../../components/HList';
import HMedia from '../../components/HMedia';
import {Movie, MovieResponse} from '../../type';
import SwiperComponent from './swiper';
import {useTrendingQuery, usePlayingQuery} from './useMoviesQuery';

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

type Props = {
  item: Movie;
  index: number;
};

const MovieMain = ({item, index}: Props) => {
  const {poster_path, original_title, overview, release_date, active} = item;
  return (
    <HMedia
      posterPath={poster_path || ''}
      originalTitle={original_title}
      overview={overview}
      releaseDate={release_date}
      fullData={item}
      active={active}
      index={index}
      handleActive={() => {}}
    />
  );
};

export default MovieMain;
