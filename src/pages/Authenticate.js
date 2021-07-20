import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import { useState } from 'react';

function Authenticate({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  // TODO: Authenticate via Firebase Authentication methods (Login/Password & Google)
  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    onLogin({ email, password });
  }

  function handleGoogleLogin() {
    // TODO: Add google login with Firebase Authentication
  }

  return (
    <Box p={4}>
      <Heading as="h2" size="lg">
        Autentícate para entrar
      </Heading>

      <Box as="form" onSubmit={handleSubmit} marginTop={4}>
        <FormControl id="email" flexDirection="column" marginTop={2} isRequired>
          <FormLabel>Correo electrónico</FormLabel>
          <Input placeholder="my-email@gmail.com" />
        </FormControl>

        <FormControl
          id="password"
          flexDirection="column"
          marginTop={2}
          isRequired
        >
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" placeholder="******" minLength={6} />
        </FormControl>

        <Button type="submit" marginTop={2}>
          {isLogin ? 'Iniciar sesión' : 'Registrarme'}
        </Button>
      </Box>

      <Button onClick={() => setIsLogin(!isLogin)} marginTop={2}>
        {isLogin ? 'Quiero registrarme' : 'Quiero iniciar sesión'}
      </Button>
    </Box>
  );
}

export default Authenticate;
