import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Movie, TV} from '../type';
import VMedia from './VMedia';

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

type Props = {
  item: Movie & TV;
};

const HList: React.FC<HListProps> = ({title, data}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 30}}
        ItemSeparatorComponent={HListSeparator}
        data={data}
        renderItem={({item}: Props) => {
          return (
            <VMedia
              posterPath={item.poster_path || ''}
              originalTitle={item.original_name ?? item.original_title}
              voteAverage={item.vote_average}
              fullData={item}
            />
          );
        }}
      />
    </ListContainer>
  );
};

export default HList;
