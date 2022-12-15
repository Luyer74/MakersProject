import React from 'react';
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const LinkItem = ({ href, children }) => {
  return (
    <Link as={NavLink} to={href}>
      <Text p={2}>{children}</Text>
    </Link>
  );
};

const NavBar = () => {
  return (
    <Box position="fixed" as="nav" w="100%" zIndex={1} mt={-1}>
      <Container
        display="flex"
        p={3}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justifyContent="space-between"
      >
        <Flex align="center" mt={1} mr={5}>
          <NavLink to="/">
            <Heading size="lg">ChangeLog</Heading>
          </NavLink>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          justifyContent="space-around"
          flexGrow={1}
          mt={{ base: 10, md: 2 }}
        >
          <LinkItem href="/">Home</LinkItem>
          <LinkItem href="/projects">Projects</LinkItem>
          <LinkItem href="/search">Search</LinkItem>
          <LinkItem href="/create">Create</LinkItem>
        </Stack>

        <Box flex={1} align="right">
          <ColorModeSwitcher></ColorModeSwitcher>
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                mt={1}
              ></MenuButton>
              <MenuList>
                <Link to="/" as={NavLink} passHref>
                  <MenuItem as={Link}>Home</MenuItem>
                </Link>
                <Link to="/projects" as={NavLink} passHref>
                  <MenuItem as={Link}>Projects</MenuItem>
                </Link>
                <Link to="/search" as={NavLink} passHref>
                  <MenuItem as={Link}>Search</MenuItem>
                </Link>
                <Link to="/create" as={NavLink} passHref>
                  <MenuItem as={Link}>Create</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
