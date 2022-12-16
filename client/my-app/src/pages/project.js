import React, { useState, useEffect } from 'react';
import { Box, Link, Button } from '@chakra-ui/react';
import { useParams, Link as ReactLink, useNavigate } from 'react-router-dom';
import Signout from '../Components/signout';
import ProjectView from '../Components/project_view';
import DeleteButton from '../Components/delete';
import Edit from '../Components/edit';

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [edit, setEdit] = useState(false);
  const project_url = 'http://localhost:5005/projects/' + projectId;
  console.log('project_url', project_url);

  const navigate = useNavigate();

  const handleRequest = data => {
    if ('status' in data) {
      navigate('/');
    } else {
      setProject(data);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const loadData = () => {
      fetch('http://localhost:5005/projects/' + projectId, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(projectData => handleRequest(projectData));
    };
    loadData();
  }, [edit]);
  return (
    <Box p={20}>
      {project && !edit ? (
        <Box>
          <ProjectView projectData={project}></ProjectView>
          <Link to="/projects" as={ReactLink}>
            <Button mb={10}>Back to Projects</Button>
          </Link>
          <Box mb="10px">
            <Button bg="blue" onClick={() => setEdit(true)}>
              Edit project
            </Button>
          </Box>
          <DeleteButton id={projectId}></DeleteButton>
        </Box>
      ) : null}
      {project && edit ? (
        <Box>
          <Edit
            projectId={projectId}
            initialName={project.name}
            initialCreator={project.creator}
            initialUpdates={project.updates}
            initialDate={project.date}
            handleEdit={handleEdit}
          ></Edit>
          <Button onClick={() => handleEdit()}>Back to Projects</Button>
        </Box>
      ) : null}
      <Signout mt={10}></Signout>
    </Box>
  );
};

export default Project;
