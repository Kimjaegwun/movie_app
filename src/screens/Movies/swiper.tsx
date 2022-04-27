import React from 'react';
import {Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Slide from '../../components/Slide';
import {MovieResponse} from '../../type';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

type SProps = {
  nowPlayingData?: MovieResponse;
};

const SwiperComponent = ({nowPlayingData}: SProps) => {
  return (
    <Swiper
      horizontal
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

export default SwiperComponent;
