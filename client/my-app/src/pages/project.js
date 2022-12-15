import React, { useState, useEffect } from 'react';
import { Box, Link, Button } from '@chakra-ui/react';
import { useParams, Link as ReactLink, useNavigate } from 'react-router-dom';
import Signout from '../Components/signout';
import ProjectView from '../Components/project_view';
import DeleteButton from '../Components/delete';

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const project_url = 'http://localhost:5005/api/projects/' + projectId;
  console.log('project_url', project_url);

  const navigate = useNavigate();

  const handleRequest = data => {
    if ('status' in data) {
      navigate('/');
    } else {
      setProject(data);
    }
  };

  useEffect(() => {
    const loadData = () => {
      fetch('http://localhost:5005/api/projects/' + projectId, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(projectData => handleRequest(projectData));
    };
    loadData();
  }, []);
  return (
    <Box p={20}>
      {project ? <ProjectView projectData={project}></ProjectView> : null}
      <Link to="/projects" as={ReactLink}>
        <Button mb={10}>Back to Projects</Button>
      </Link>
      <DeleteButton id={projectId}></DeleteButton>
      <Signout mt={10}></Signout>
    </Box>
  );
};

export default Project;
