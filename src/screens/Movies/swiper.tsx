import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Slide from '../../components/Slide';
import {Movie, MovieResponse} from '../../type';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

type SProps = {
  nowPlayingData?: MovieResponse;
};

const SwiperComponent = ({nowPlayingData}: SProps) => {
  const navigation = useNavigation<any>();

  return (
    <Swiper
      horizontal
      showsPagination={true}
      containerStyle={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 4,
        marginBottom: 35,
      }}>
      {nowPlayingData?.results.map((movie: Movie) => {
        const {
          id,
          backdrop_path,
          poster_path,
          original_title,
          vote_average,
          overview,
        } = movie;

        const goToDetail = () => {
          navigation.navigate('Stack', {
            screen: 'Detail',
            params: {
              ...movie,
            },
          });
        };

        const SlideProps = {
          key: id,
          backdropPath: backdrop_path || '',
          posterPath: poster_path || '',
          originalTitle: original_title,
          voteAverage: vote_average,
          overview,
          goToDetail,
        };

        return <Slide {...SlideProps} />;
      })}
    </Swiper>
  );
};

export default SwiperComponent;
