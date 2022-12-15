import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectsView from '../Components/projects_view';

const Projects = ({ url, title }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequest = data => {
    if ('status' in data) {
      if (data.status == 'Invalid') {
        console.log('Invalid date');
      } else {
        navigate('/');
      }
    }
    setData(data);
  };

  const handlePage = i => {
    setPage(i);
  };

  useEffect(() => {
    const loadData = () => {
      url += '?page=' + page;
      console.log('FETCHING FROM', url);
      fetch(url, {
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
      {data ? (
        <ProjectsView
          handlePage={handlePage}
          data={data}
          title={title}
        ></ProjectsView>
      ) : null}
    </>
  );
};

export default Projects;
