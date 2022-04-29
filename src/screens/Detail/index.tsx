import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Linking, Share, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

import {Movie, TV} from '../../type';
import {makeImgPath} from '../../utils';
import DetailBody from './DetailBody';
import Loader from '../../components/Loader';
import {useDetailQuery} from './useDetailQuery';

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: {setOptions},
  route: {params},
}) => {
  const shareMedia = async () => {
    await Share.share({
      url: isMovie
        ? `https://www.imdb.com/title/${data?.imdb_id || ''}/`
        : data?.homepage || '',
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  };

  const isMovie = 'original_title' in params;
  const {isLoading, data} = useDetailQuery(isMovie, params);

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
    if (data) {
      setOptions({
        headerRight: () => <ShareButton shareMedia={shareMedia} />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const openYTLink = (videoID: string) => async () => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;

    await Linking.openURL(baseUrl);
  };

  const DetailProps = {
    params,
    makeImgPath,
    isLoading,
    data: data,
    openYTLink,
  };

  return isLoading ? <Loader /> : <DetailBody {...DetailProps} />;
};

const ShareButton = ({shareMedia}: {shareMedia: () => void}) => (
  <TouchableOpacity onPress={shareMedia}>
    <Icon name="share" color="white" size={24} />
  </TouchableOpacity>
);

export default Detail;
