import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import SearchFormNormal from './search_form_normal';
import SearchFormDate from './search_form_date';

const SearchForm = ({ handleSearch }) => {
  const [name, setName] = useState('');
  const [creator, setCreator] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const handleName = data => {
    console.log(data);
    setName(data);
  };
  const handleCreator = data => {
    console.log(data);
    setCreator(data);
  };
  const handleDate1 = data => {
    console.log(data);
    setDate1(data);
  };
  const handleDate2 = data => {
    console.log(data);
    setDate2(data);
  };

  return (
    <Box p={20}>
      <Heading mb="20px">Search</Heading>
      <SearchFormNormal
        data={name}
        handleData={handleName}
        title={'name'}
        handleSubmit={handleSearch}
      ></SearchFormNormal>
      <SearchFormNormal
        data={creator}
        handleData={handleCreator}
        title={'creator'}
        handleSubmit={handleSearch}
      ></SearchFormNormal>
      <SearchFormDate
        date1={date1}
        date2={date2}
        handleDate1={handleDate1}
        handleDate2={handleDate2}
        handleSubmit={handleSearch}
      ></SearchFormDate>
    </Box>
  );
};

export default SearchForm;
