import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigation/Root';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './styled';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 10000,
    },
  },
});

const App = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
