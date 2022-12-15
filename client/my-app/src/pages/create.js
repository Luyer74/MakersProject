import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [creator, setCreator] = useState('');
  const [date, setDate] = useState('');
  const [updates, setUpdates] = useState([{ title: '', points: [''] }]);
  const navigate = useNavigate();

  const addUpdate = e => {
    let temp = [...updates];
    temp.push({ title: '', points: [''] });
    setUpdates(temp);
  };

  const addPoint = (e, i) => {
    let temp = [...updates];
    temp[i].points.push('');
    setUpdates(temp);
  };

  const deleteUpdate = (e, i) => {
    let temp = [...updates];
    temp.splice(i, 1);
    setUpdates(temp);
  };

  const deletePoint = (e, i, j) => {
    let temp = [...updates];
    temp[i].points.splice(j, 1);
    setUpdates(temp);
  };

  const handleUpdateTitle = (e, i) => {
    let temp = [...updates];
    temp[i].title = e.target.value;
    setUpdates(temp);
  };

  const handleUpdatePoint = (e, i, j) => {
    let temp = [...updates];
    temp[i].points[j] = e.target.value;
    setUpdates(temp);
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let res = await fetch(
        'http://localhost:5005/api/projects/create/createProject',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            creator: creator,
            date: date,
            updates: updates,
          }),
        }
      );
      let response = await res.json();
      let status = response.status;
      if (status === 'Success') {
        navigate('/projects');
      } else {
        console.log(status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={20}>
      <Heading mb={10}>Create New Project</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Input>
          <FormLabel>Creator</FormLabel>
          <Input
            type="text"
            value={creator}
            onChange={e => setCreator(e.target.value)}
          ></Input>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          ></Input>
        </FormControl>
        <Button mt={10} onClick={() => addUpdate()}>
          Add update
        </Button>
        {updates.map((update, i) => (
          <Box
            mt="20px"
            bg="gray.300"
            _dark={{ bg: 'gray.800' }}
            p="50px"
            borderRadius={10}
          >
            <Text fontWeight={'bold'} mb={'20px'}>
              Update {i + 1}
            </Text>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={updates[i].title}
              onChange={e => handleUpdateTitle(e, i)}
            ></Input>
            <FormLabel mt={'10px'} mb={'20px'}>
              Points
            </FormLabel>
            <Button onClick={e => addPoint(e, i)}>Add point</Button>
            {update.points.map((point, j) => (
              <Box mt="20px">
                <FormLabel>Point {j + 1}</FormLabel>
                <Input
                  type="text"
                  value={updates[i].points[j]}
                  onChange={e => handleUpdatePoint(e, i, j)}
                  width="80%"
                ></Input>
                <Button onClick={e => deletePoint(e, i, j)} bg="red" ml="10px">
                  Delete Point
                </Button>
              </Box>
            ))}
            <Box>
              <Button
                onClick={e => deleteUpdate(e, i)}
                bg="red"
                mb="10px"
                mt="30px"
              >
                Delete Update
              </Button>
            </Box>
          </Box>
        ))}
        <Button
          type="submit"
          mt="20px"
          size="lg"
          rightIcon={<ArrowForwardIcon></ArrowForwardIcon>}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Create;
