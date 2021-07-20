import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Box } from '@chakra-ui/layout';

import Header from './components/Header';
import Home from './pages/Home';
import SharedExpense from './pages/SharedExpense';
import Authenticate from './pages/Authenticate';
import firebase from './config/firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const currentUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
        };

        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(null));
  }

  return (
    <Box>
      <Header hasUser={!!user} onLogout={handleLogout} />

      <Box as="main">
        <Switch>
          <Route path="/expenses/:id" exact>
            {user ? <SharedExpense allExpenses={[]} /> : <Redirect to="/" />}
          </Route>

          <Route path="/">
            {user ? <Home user={user} /> : <Authenticate onLogin={setUser} />}
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
