import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  List,
} from '@chakra-ui/react';

const ProjectView = ({ projectData }) => {
  console.log(projectData.updates);
  return (
    <Box mb={10}>
      <Heading>{projectData.name}</Heading>
      <Text mt={10}>{projectData.creator}</Text>
      <Text>{projectData.date.substring(0, 10)}</Text>
      <UnorderedList>
        {projectData.updates.map(update => (
          <Box mt="20px">
            <Text fontWeight={'bold'}>{update.title}</Text>
            {update.points.map(point => (
              <ListItem>{point}</ListItem>
            ))}
          </Box>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default ProjectView;
