import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './lib/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>hola</Box>
    </ChakraProvider>
  );
}

export default App;
