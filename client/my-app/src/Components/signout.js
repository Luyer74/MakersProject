import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();
  const logout = () => {
    fetch('https://makers-project-api.onrender.com/logout', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(status => navigate('/'))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box mt={10}>
      <Button onClick={logout}>Sign Out</Button>
    </Box>
  );
};

export default Signout;
