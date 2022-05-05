import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Movie, TV} from '../type';
import VMedia from './VMedia';
import analytics, {firebase} from '@react-native-firebase/analytics';

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
  data?: any[];
}

type Props = {
  item: Movie & TV;
};

const HList: React.FC<HListProps> = ({title, data}) => {
  const navigation = useNavigation<any>();

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
          const {poster_path, original_name, vote_average, original_title} =
            item;

          const goToDetail = async () => {
            navigation.navigate('Stack', {
              screen: 'Detail',
              params: {
                ...item,
              },
            });
          };

          const VProps = {
            posterPath: poster_path || '',
            originalTitle: original_name ?? original_title,
            voteAverage: vote_average,
            fullData: item,
            goToDetail,
          };

          return <VMedia {...VProps} />;
        }}
      />
    </ListContainer>
  );
};

export default HList;
