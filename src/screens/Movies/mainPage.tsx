import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import HList from '../../components/HList';
import HMedia from '../../components/HMedia';
import {Movie, MovieResponse} from '../../type';
import SwiperComponent from './swiper';
import {useTrendingQuery, usePlayingQuery} from './useDetailQuery';

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
  loadMore: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  upcoming?: Movie[];
  movieKeyExtractor: (item: Movie) => string;
  nowPlayingData?: MovieResponse;
  handleActive: (id: number) => void;
};

const MainPage = ({
  loadMore,
  onRefresh,
  refreshing,
  upcoming,
  movieKeyExtractor,
  handleActive,
}: Props) => {
  return (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={3}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={({item, index}) => {
        const {poster_path, original_title, overview, release_date, active} =
          item;
        return (
          <HMedia
            posterPath={poster_path || ''}
            originalTitle={original_title}
            overview={overview}
            releaseDate={release_date}
            fullData={item}
            active={active}
            index={index}
            handleActive={handleActive}
          />
        );
      }}
      ListHeaderComponent={HeaderComponent}
    />
  );
};

const HeaderComponent = () => {
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

export default MainPage;
