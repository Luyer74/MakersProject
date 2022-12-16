import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();
  const logout = () => {
    fetch('http://localhost:5005/api/projects/delete/' + id, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(status => navigate('/projects'))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Button onClick={logout} bg="red" mb="10px">
        Delete Project
      </Button>
    </Box>
  );
};

export default DeleteButton;
