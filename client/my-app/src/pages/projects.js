import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Link, Button } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Signout from '../Components/signout';

const Projects = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleRequest = data => {
    if ('status' in data) {
      navigate('/');
    } else {
      setData(data);
    }
  };

  const handlePage = i => {
    console.log(i);
    setPage(i);
  };

  useEffect(() => {
    const loadData = () => {
      fetch('http://localhost:5005/api/projects?page=' + page, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(allProjects => handleRequest(allProjects))
        .catch(err => {
          console.log(err);
        });
    };
    loadData();
  }, [page]);

  return (
    <>
      <Box p={20}>
        <Heading>All Projects</Heading>
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
        </Box>
        <Signout mt={10}></Signout>
      </Box>
    </>
  );
};

export default Projects;
