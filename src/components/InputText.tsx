import React from 'react';
import styled from 'styled-components/native';

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
};

const InputText = ({value, onChange, onSubmit}: Props) => {
  return (
    <SearchBar
      placeholder="Search for Movie or TV Show"
      placeholderTextColor="gray"
      returnKeyType="search"
      autoCapitalize="none"
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
  );
};

export default InputText;
