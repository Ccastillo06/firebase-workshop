import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import Header from './components/Header';
import Home from './pages/Home';
import SharedExpense from './pages/SharedExpense';
import Authenticate from './pages/Authenticate';
import firebase from './config/firebase';

import { mockAllExpenses } from './mockExpenses';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // TODO: Change to load all user expenses from Firestore
  const [allExpenses, setAllExpenses] = useState(mockAllExpenses);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(null);
      }

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      // .then(() => {
      //   setUser(null);
      // })
      .catch((err) => {
        console.error('Error in signOut:', err.message);
      });
  }

  return (
    <Box>
      <Header hasUser={!!user} onLogout={handleLogout} />

      <Box as="main">
        {loading ? (
          <Box textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <Switch>
            <Route path="/expenses/:id" exact>
              {user ? (
                <SharedExpense allExpenses={allExpenses} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/">
              {user ? (
                <Home userId={user.uid} />
              ) : (
                <Authenticate onLogin={setUser} />
              )}
            </Route>
          </Switch>
        )}
      </Box>
    </Box>
  );
}

export default App;
