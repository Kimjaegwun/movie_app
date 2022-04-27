import {useState} from 'react';

export const useInputProps = (handleSubmit?: Function) => {
  const [value, setValue] = useState('');

  const props = {
    value,
    onChange: (text: string) => setValue(text),
    onSubmit: () => {
      handleSubmit?.(value);
    },
  };

  return props;
};
