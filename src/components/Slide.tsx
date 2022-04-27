import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import styled from 'styled-components/native';
import {makeImgPath} from '../utils';
import Poster from './Poster';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image`
  flex: 1;
  opacity: 0.2;
  height: ${SCREEN_HEIGHT / 4 + 'px'};
  width: ${SCREEN_WIDTH + 'px'};
  position: absolute;
`;

const Title = styled.Text<{isDark: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text<{isDark: boolean}>`
  margin-top: 10px;
  color: ${(props: any) =>
    props.isDark ? 'rgba(255, 255, 255, 0.6)' : props.theme.textColor};
`;

const Votes = styled(OverView)<{isDark: boolean}>`
  font-size: 12px;
  color: ${(props: any) => (props.isDark ? 'white' : props.theme.textColor)};
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  goToDetail: () => void;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  goToDetail,
}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View>
        <BgImg source={{uri: makeImgPath(backdropPath)}} />
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? (
              <Votes isDark={isDark}>⭐ {voteAverage} / 10</Votes>
            ) : null}
            <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
          </Column>
        </Wrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
