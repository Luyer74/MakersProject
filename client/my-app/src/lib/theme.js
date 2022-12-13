import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      bg: mode('#ffffff', '#283138')(props),
    },
  }),
};

const colors = {
  color1: '#2A2D34',
  color2: '#A0DDE6',
  color3: '#80C2AF',
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors });
export default theme;
