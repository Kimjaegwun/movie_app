import React from 'react';
import {ScrollView} from 'react-native';
import HList from '../../components/HList';
import InputText from '../../components/InputText';
import Loader from '../../components/Loader';
import {useInputProps} from '../../hook';
import {useSearchMovieQuery, useSearchTVQuery} from './useSearhQuery';

const Search = () => {
  const onSubmit = () => {
    if (InputProps.value === '') {
      return;
    }
    searchMovies();
    searchTV();
  };
  const InputProps = useInputProps(onSubmit);
  const {value} = InputProps;

  const {
    isLoading: loadingMoves,
    data: moviesData,
    refetch: searchMovies,
  } = useSearchMovieQuery(value);

  const {
    isLoading: loadingTV,
    data: tvData,
    refetch: searchTV,
  } = useSearchTVQuery(value);

  return (
    <ScrollView>
      <InputText {...InputProps} />
      {loadingMoves || loadingTV ? <Loader /> : null}
      {moviesData ? (
        <HList title="Moive Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </ScrollView>
  );
};

export default Search;
