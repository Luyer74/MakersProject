import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';

const SearchFormNormal = ({ data, handleData, title, handleSubmit }) => {
  const constructData = () => {
    let obj = {};
    obj[title] = data;
    console.log(obj);
    return obj;
  };
  return (
    <Box mb={10}>
      <form action="">
        <FormControl isRequired>
          <FormLabel>By {title}</FormLabel>
          <HStack>
            <Input
              type="text"
              value={data}
              onChange={e => handleData(e.target.value)}
              width="90%"
              mr={5}
            ></Input>
            <Button type="submit" onClick={() => handleSubmit(constructData())}>
              Go
            </Button>
          </HStack>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchFormNormal;
