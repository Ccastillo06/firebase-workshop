import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useState } from 'react';
import GoogleButton from 'react-google-button';

import firebase from '../config/firebase';

function Authenticate({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target[0].value.trim();
    const password = e.target[1].value.trim();

    // Lógica de registro
    if (!isLogin) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        // .then((currentUser) => {
        //   const { email, uid } = currentUser.user;
        //   onLogin({ email, uid });
        // })
        .catch((err) => {
          console.error(
            'Error in createUserWithEmailAndPassword:',
            err.message
          );
          setError(err.message);
        });
      // Lógica de login
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        // .then((currentUser) => {
        //   const { email, uid } = currentUser.user;
        //   onLogin({ email, uid });
        // })
        .catch((err) => {
          console.error('Error in signInWithEmailAndPassword:', err.message);
          // console.log(err.code);
          setError(err.message);
        });
    }
  }

  function handleGoogleLogin() {
    // TODO: Add google login with Firebase Authentication
    // 1. Crear un provider de Google
    const provider = new firebase.auth.GoogleAuthProvider();
    // 2. Abro popup de inicio de sesión con el provider
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((currentUser) => {
        console.log('Google user:', { currentUser });
      })
      .catch((err) => {
        console.error('Error in signInWithPopup:', err.message);
        setError(err.message);
      });
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

        {error ? <Text color="red">{error}</Text> : null}

        <Button type="submit" marginTop={2}>
          {isLogin ? 'Iniciar sesión' : 'Registrarme'}
        </Button>
      </Box>

      <Button onClick={() => setIsLogin(!isLogin)} marginTop={2}>
        {isLogin ? 'Quiero registrarme' : 'Quiero iniciar sesión'}
      </Button>

      <Box marginTop={2}>
        <GoogleButton label="Entrar con Google" onClick={handleGoogleLogin} />
      </Box>
    </Box>
  );
}

export default Authenticate;
