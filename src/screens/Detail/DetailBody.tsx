import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {BLACK_COLOR} from '../../colors';
import {MovieDetails, TVDetails} from '../../type';
import Poster from '../../components/Poster';

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

type Props = {
  params: any;
  makeImgPath: (path: string) => string;
  isLoading: boolean;
  data?: MovieDetails | TVDetails;
  openYTLink: any;
};

const DetailBody = ({params, makeImgPath, data, openYTLink}: Props) => {
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
        {data?.videos?.results?.map(video => (
          <VideoBtn key={video.key} onPress={openYTLink(video.key)}>
            <Icon name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default DetailBody;
