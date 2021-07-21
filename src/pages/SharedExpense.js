import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { v4 as uuid } from 'uuid';

import Participants from '../components/Participants';
import Expenses from '../components/Expenses';
import Payments from '../components/Payments';
import { getExpenseById, updateExpenseById } from '../db/expenses';
import { Button } from '@chakra-ui/button';

function SharedExpense() {
  const [sharedExpenses, setSharedExpenses] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getExpenseById(id).then((pageExpenses) => {
      setSharedExpenses(pageExpenses);
    });
  }, [id]);

  async function handleSaveChanges() {
    await updateExpenseById(id, sharedExpenses);
    setHasChanges(false);
  }

  function handleSaveParticipant(e) {
    setSharedExpenses({
      ...sharedExpenses,
      participants: [
        ...sharedExpenses.participants,
        {
          id: uuid(),
          name: e.target[0].value.toLowerCase(),
        },
      ],
    });

    setHasChanges(true);
  }

  function handleSaveExpense(e) {
    const userId = e.target[0].value;
    const price = Number(e.target[1].value);
    const title = e.target[2].value.trim().toLowerCase();

    setSharedExpenses({
      ...sharedExpenses,
      expenses: [
        ...sharedExpenses.expenses,
        {
          id: uuid(),
          title,
          price,
          paidBy: sharedExpenses.participants.find((p) => p.id === userId),
        },
      ],
    });

    setHasChanges(true);
  }

  if (!sharedExpenses) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h2" size="lg">
        {sharedExpenses.title}
      </Heading>

      <Expenses
        expenseList={sharedExpenses.expenses}
        handleSaveExpense={handleSaveExpense}
        participantList={sharedExpenses.participants}
      />

      <Participants
        handleSaveParticipant={handleSaveParticipant}
        participantList={sharedExpenses.participants}
      />

      <Payments
        expenseList={sharedExpenses.expenses}
        participantList={sharedExpenses.participants}
      />

      <Divider marginTop={2} />

      {hasChanges ? (
        <Button
          color="white"
          backgroundColor="blue.400"
          onClick={handleSaveChanges}
        >
          Guardar cambios
        </Button>
      ) : null}
    </Box>
  );
}

export default SharedExpense;
