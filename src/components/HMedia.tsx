import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Movie} from '../type';
import Poster from './Poster';
import Votes from './Votes';

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0px;
  font-weight: 500;
  opacity: 0.6;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  padding: 5px 0;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  flex: 1;
`;

const BookmarkBtn = styled.TouchableOpacity<{active?: boolean}>`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: ${props => (props.active ? 'purple' : 'transparent')};
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  active?: boolean;
  index: number;
  handleActive: any;
  goToDetail: () => void;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
  active,
  index,
  handleActive,
  goToDetail,
}) => {
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <TitleWrapper>
            <Title>
              {originalTitle.length > 30
                ? `${originalTitle.slice(0, 30)}...`
                : originalTitle}
            </Title>
            <BookmarkBtn
              active={active}
              onPress={() => {
                handleActive(index);
              }}
            />
          </TitleWrapper>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== '' && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};
export default HMedia;
