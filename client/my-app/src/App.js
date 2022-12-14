import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './lib/theme';
import MainRouter from './lib/router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRouter></MainRouter>
    </ChakraProvider>
  );
}

export default App;
