import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import HList from '../../components/HList';
import Slide from '../../components/Slide';
import {InfinityResponse, Movie, MovieResponse} from '../../type';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

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
  upcomingData?: InfinityResponse;
  movieKeyExtractor: (item: Movie) => string;
  renderHMedia: any;
  nowPlayingData?: MovieResponse;
  trendingData?: MovieResponse;
};

const MainPage = ({
  loadMore,
  onRefresh,
  refreshing,
  upcomingData,
  movieKeyExtractor,
  renderHMedia,
  nowPlayingData,
  trendingData,
}: Props) => {
  return (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={3}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcomingData?.pages
        .map(page => {
          return page.results;
        })
        .flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
      ListHeaderComponent={() => (
        <React.Fragment>
          <SwiperComponent nowPlayingData={nowPlayingData} />
          <HList title="Treding Movies" data={trendingData?.results || []} />
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </React.Fragment>
      )}
    />
  );
};

type SProps = {
  nowPlayingData?: MovieResponse;
};

const SwiperComponent = ({nowPlayingData}: SProps) => {
  return (
    <Swiper
      horizontal
      showsButtons={false}
      showsPagination={true}
      containerStyle={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 4,
        marginBottom: 35,
      }}>
      {nowPlayingData?.results.map((movie: any) => {
        return (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path || ''}
            posterPath={movie.poster_path || ''}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
            fullData={movie}
          />
        );
      })}
    </Swiper>
  );
};

export default MainPage;
