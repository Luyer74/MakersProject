import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Projects from '../pages/projects';
import Project from '../pages/project';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Home from '../pages/home';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const MainRouter = () => {
  return (
    <Box as="main" pb={8}>
      <ColorModeSwitcher></ColorModeSwitcher>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup></Signup>}></Route>
          <Route path="/projects" element={<Projects></Projects>}></Route>
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
