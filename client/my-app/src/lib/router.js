import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Projects from '../pages/projects';
import Project from '../pages/project';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Home from '../pages/home';
import Search from '../pages/search';
import NavBar from '../Components/navbar';
import Create from '../pages/create';

const MainRouter = () => {
  const projectsURL = 'http://localhost:5005/projects';
  return (
    <Box as="main" pb={8}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup></Signup>}></Route>
          <Route path="/create" element={<Create></Create>}></Route>
          <Route
            path="/projects"
            element={
              <Projects url={projectsURL} title={'All Projects'}></Projects>
            }
          ></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route
            path="/search/:projectId"
            element={<Project></Project>}
          ></Route>
          <Route
            path="/projects/:projectId"
            element={<Project></Project>}
          ></Route>
        </Routes>
      </Router>
    </Box>
  );
};

export default MainRouter;
