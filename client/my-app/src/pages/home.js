import React from 'react';
import { Link, Button, Box, Heading } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box p={20} textAlign="center">
      <Heading mb={20}>Change Log</Heading>
      <Box mt={10}>
        <Link as={ReactLink} to={'/login'}>
          <Button textAlign="center">Login</Button>
        </Link>
      </Box>
      <Box mt={10}>
        <Link as={ReactLink} to={'/register'}>
          <Button textAlign="center">Register</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
