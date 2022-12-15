import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Link, Button } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Signout from '../Components/signout';

const ProjectsView = ({ data, handlePage, title }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <Box p={20}>
      <Heading mb={10}>{title}</Heading>
      {data
        ? data.allProjects.map(project => (
            <Link as={ReactLink} key={project._id} to={project._id}>
              <Box p={20} m={5} bg="color2" borderRadius={20}>
                <Text textAlign="center">{project.name}</Text>
              </Box>
            </Link>
          ))
        : null}
      <Box textAlign={'center'}>
        {data
          ? [...Array(data.totalPages)].map((x, i) => (
              <Button mr="10px" key={i} onClick={() => handlePage(i + 1)}>
                {i + 1}
              </Button>
            ))
          : null}
        {title === 'All Projects' ? (
          <Box mt={10}>
            <Button onClick={() => navigate('/search')}>Search</Button>
          </Box>
        ) : null}
        <Signout></Signout>
      </Box>
    </Box>
  );
};

export default ProjectsView;
