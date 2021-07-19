import { Link } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/layout';
import { Button, Heading } from '@chakra-ui/react';

function Header({ hasUser, onLogout }) {
  return (
    <Box as="header" px={4} py={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Heading as="h1">Split & Share</Heading>
        </Link>

        {hasUser ? <Button onClick={onLogout}>Logout</Button> : null}
      </Flex>

      <Heading as="h6" size="xs" marginTop={2}>
        En colaboración con Upgrade Hub
      </Heading>
    </Box>
  );
}

export default Header;
