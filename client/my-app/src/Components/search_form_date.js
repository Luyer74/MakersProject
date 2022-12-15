import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';

const SearchFormDate = ({
  date1,
  date2,
  handleDate1,
  handleDate2,
  handleSubmit,
}) => {
  const constructData = () => {
    let obj = {};
    obj['date1'] = date1;
    obj['date2'] = date2;
    console.log(obj);
    return obj;
  };
  return (
    <Box mb={10}>
      <form action="">
        <FormControl isRequired>
          <FormLabel>By date range</FormLabel>
          <HStack>
            <Input
              type="date"
              value={date1}
              onChange={e => handleDate1(e.target.value)}
              width="40%"
              mr={5}
            ></Input>
            <Input
              type="date"
              value={date2}
              onChange={e => handleDate2(e.target.value)}
              width="40%"
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

export default SearchFormDate;
