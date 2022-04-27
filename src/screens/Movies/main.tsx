import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import HMedia from '../../components/HMedia';
import {Movie} from '../../type';

type Props = {
  item: Movie;
  index: number;
  handleActive: (id: number) => void;
};

const MovieMain = ({item, index, handleActive}: Props) => {
  const {poster_path, original_title, overview, release_date, active} = item;

  const navigation = useNavigation<any>();

  const goToDetail = useCallback(() => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...item,
      },
    });
  }, [item, navigation]);

  const MediaProps = {
    posterPath: poster_path || '',
    originalTitle: original_title,
    overview,
    releaseDate: release_date,
    active,
    index,
    handleActive,
    goToDetail,
  };
  return <HMedia {...MediaProps} />;
};

export default MovieMain;
