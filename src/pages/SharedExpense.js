import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { v4 as uuid } from 'uuid';

import Participants from '../components/Participants';
import Expenses from '../components/Expenses';
import Payments from '../components/Payments';

function SharedExpense({ allExpenses }) {
  const [sharedExpenses, setSharedExpenses] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // TODO: Change this so it uses Firestore to load the value
    const pageExpenses = allExpenses.find((e) => e.id === id);
    setSharedExpenses(pageExpenses);
  }, [id]);

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

    // TODO: Save in Firestore
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

    // TODO: Save in Firestore
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
    </Box>
  );
}

export default SharedExpense;
