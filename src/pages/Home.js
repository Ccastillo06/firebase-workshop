import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

import { getNewExpense } from '../mockExpenses';

function Home({ allExpenses, setAllExpenses }) {
  function handleAddExpense(title) {
    setAllExpenses([...allExpenses, getNewExpense(title)]);
  }

  return (
    <Box p={4}>
      <Heading as="h2" size="lg">
        Todos mis gastos
      </Heading>

      <Stack spacing={4} marginTop={4}>
        {allExpenses.map((expense) => (
          <Box padding={4} shadow="md" borderWidth="1px" key={expense.id}>
            <Link to={`/expenses/${expense.id}`}>
              <Heading fontSize="xl">{expense.title}</Heading>
              <Text marginTop={2}>
                Participantes: {expense.participants.length}
              </Text>
            </Link>
          </Box>
        ))}
      </Stack>

      <Divider marginTop={4} />

      <Box marginTop={4}>
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();

            const title = e.target[0].value.trim().toLowerCase();
            handleAddExpense(title);

            e.target.reset();
          }}
        >
          <FormControl id="title" isRequired>
            <FormLabel>Título</FormLabel>
            <Input placeholder="Cena en la Casa Blanca" />
          </FormControl>

          <Button marginTop={2} type="submit">
            Nuevo gasto compartido
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
