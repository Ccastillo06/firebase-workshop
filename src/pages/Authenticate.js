import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useState } from 'react';
import GoogleButton from 'react-google-button';

import firebase from '../config/firebase';

function Authenticate({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    setError(null);

    if (!isLogin) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const newUser = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          };

          onLogin(newUser);
        })
        .catch((err) => {
          console.log('Error createUserWithEmailAndPassword:', err.message);
          setError(err.message);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const newUser = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          };

          onLogin(newUser);
        })
        .catch((err) => {
          console.log('Error signInWithEmailAndPassword:', err.message);
          setError(err.message);
        });
    }
  }

  function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        const newUser = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
        };

        onLogin(newUser);
      })
      .catch((err) => {
        console.log('Error handleGoogleLogin:', err.message);
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

        <Button type="submit" marginTop={2}>
          {isLogin ? 'Iniciar sesión' : 'Registrarme'}
        </Button>

        {error ? (
          <Text marginTop={2} color="red">
            {error}
          </Text>
        ) : null}
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
