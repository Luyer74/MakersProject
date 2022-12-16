import React, { useEffect, useState } from 'react';
import SearchForm from '../Components/searchForm';
import { Box, Button } from '@chakra-ui/react';
import Projects from './projects';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [hasSearched, setHasSearched] = useState(null);
  const navigate = useNavigate();

  const handleStatus = status => {
    if (status.status != 'OK') {
      navigate('/');
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      fetch('https://makers-project-api.onrender.com/checkLogin', {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(status => handleStatus(status));
    };
    checkLogin();
  }, []);

  const handleSearch = data => {
    let apiUrl = null;
    if (data) {
      apiUrl = constructURL(data);
    }
    setHasSearched(apiUrl);
  };

  const constructURL = data => {
    let url = 'http://localhost:5005/projects/';
    if ('name' in data) {
      url += 'name/' + encodeURIComponent(data.name);
    } else if ('creator' in data) {
      url += 'creator/' + encodeURIComponent(data.creator);
    } else {
      url +=
        'date/getDate?startDate=' +
        encodeURIComponent(data.date1) +
        '&endDate=' +
        encodeURIComponent(data.date2) +
        '&';
    }
    console.log(url);
    return url;
  };
  return (
    <Box>
      {hasSearched ? (
        <Box>
          <Projects url={hasSearched} title="Search Results"></Projects>
          <Box textAlign={'center'}>
            <Button onClick={() => handleSearch(null)}>Back to search</Button>
          </Box>
        </Box>
      ) : (
        <SearchForm handleSearch={handleSearch}></SearchForm>
      )}
      <Box mt={10} textAlign="center">
        <Button onClick={() => navigate('/projects')}>All Projects</Button>
      </Box>
    </Box>
  );
};

export default Search;
