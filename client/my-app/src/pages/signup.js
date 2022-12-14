import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:5005/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      let response = await res.json();
      let status = response.status;
      if (status === 'Success') {
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        setMessage(status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={20}>
      <Heading mb={10}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Input>
          <FormLabel mt={10}>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Input>
          <FormHelperText>Your email is confidential.</FormHelperText>
          <FormLabel mt={10}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Input>
          <FormHelperText>At least 8 characters.</FormHelperText>
        </FormControl>
        {message ? (
          <Alert status="error" mt={10}>
            <AlertIcon></AlertIcon>
            {message}
          </Alert>
        ) : null}
        <Button type="Submit" mt={10}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
