import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Box } from '@chakra-ui/layout';

import Header from './components/Header';
import Home from './pages/Home';
import SharedExpense from './pages/SharedExpense';
import Authenticate from './pages/Authenticate';

import { mockAllExpenses } from './mockExpenses';

function App() {
  const [user, setUser] = useState(null);
  // TODO: Change to load all user expenses from Firestore
  const [allExpenses, setAllExpenses] = useState(mockAllExpenses);

  return (
    <Box>
      <Header hasUser={!!user} onLogout={() => setUser(null)} />

      <Box as="main">
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
              <Home allExpenses={allExpenses} setAllExpenses={setAllExpenses} />
            ) : (
              <Authenticate onLogin={setUser} />
            )}
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
