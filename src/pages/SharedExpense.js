import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Divider, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { v4 as uuid } from 'uuid';

import Participants from '../components/Participants';
import Expenses from '../components/Expenses';
import Payments from '../components/Payments';
import {
  deleteExpenseById,
  getExpenseById,
  saveExpenseChanges,
} from '../db/expenses';
import { Button } from '@chakra-ui/button';

function SharedExpense() {
  const [sharedExpenses, setSharedExpenses] = useState(null);
  const [pendingChanges, setPendingChannges] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getExpenseById(id).then(setSharedExpenses);
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

    if (!pendingChanges) {
      setPendingChannges(true);
    }
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

    if (!pendingChanges) {
      setPendingChannges(true);
    }
  }

  async function handleSaveChanges() {
    const { id, ...restExpense } = sharedExpenses;

    await saveExpenseChanges(id, restExpense);
    setPendingChannges(false);
  }

  async function handleDeleteExpense() {
    const { id } = sharedExpenses;
    await deleteExpenseById(id);
    history.push('/');
  }

  async function handleEditExpense(expenseId, imageUrl) {
    const editedExpenses = sharedExpenses.expenses.map((expense) => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          imageUrl,
        };
      }

      return expense;
    });

    const newSharedExpenses = {
      ...sharedExpenses,
      expenses: editedExpenses,
    };

    setSharedExpenses(newSharedExpenses);

    const { id, ...restExpense } = newSharedExpenses;
    await saveExpenseChanges(id, restExpense);
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

      {pendingChanges ? (
        <Button
          onClick={handleSaveChanges}
          bgColor="green.500"
          color="white"
          marginTop={2}
        >
          Guardar cambios
        </Button>
      ) : null}

      <Expenses
        sharedExpenseId={sharedExpenses.id}
        expenseList={sharedExpenses.expenses}
        handleSaveExpense={handleSaveExpense}
        handleEditExpense={handleEditExpense}
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
      <Button
        onClick={handleDeleteExpense}
        bgColor="red.500"
        color="white"
        marginTop={2}
      >
        Eliminar gastos
      </Button>
    </Box>
  );
}

export default SharedExpense;
