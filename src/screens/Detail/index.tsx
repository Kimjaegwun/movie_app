import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  Linking,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {Movie, TV} from '../../type';
import {moviesApi, tvApi} from '../../api';
import Poster from '../../components/Poster';
import {makeImgPath} from '../../utils';
import {BLACK_COLOR} from '../../colors';
import {useQuery} from 'react-query';
import Loader from '../../components/Loader';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props: any) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props: any) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

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
        ? `https://www.imdb.com/title/${data?.imdb_id}/`
        : data!.homepage,
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Icon name="share" color="white" size={24} />
    </TouchableOpacity>
  );

  const isMovie = 'original_title' in params;
  const {isLoading, data} = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    // @ts-ignore
    isMovie ? moviesApi.detail : tvApi.detail,
    {
      enabled: 'original_title' in params,
    },
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;

    await Linking.openURL(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{uri: makeImgPath(params.backdrop_path || '')}}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map(video => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Icon name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
