import { Fragment } from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react';

function Payments({ expenseList, participantList }) {
  const initialExpenses = participantList.reduce(
    (acc, next) => ({
      ...acc,
      [next.id]: {
        ...next,
        total: 0,
      },
    }),
    {}
  );

  const totalExpenses = expenseList.reduce((acc, next) => {
    return {
      ...acc,
      [next.paidBy.id]: {
        ...(acc[next.paidBy.id] || {}),
        total: acc[next.paidBy.id].total + next.price,
      },
    };
  }, initialExpenses);

  const totalPaid = expenseList.reduce((acc, next) => acc + next.price, 0);
  const paymentPerPerson = totalPaid / participantList.length;

  const totalWithDebts = Object.keys(totalExpenses).reduce((acc, next) => {
    return {
      ...acc,
      [next]: {
        ...totalExpenses[next],
        owns: paymentPerPerson - totalExpenses[next].total,
      },
    };
  }, {});

  return (
    <Box paddingTop={4}>
      <Heading as="h3" size="md">
        Ajuste de cuentas 💸💸💸
      </Heading>

      <Box py={2}>
        <Heading as="h5" size="sm">
          ¡Recuerda!
        </Heading>
        <Text fontSize="xs">Valor en positivo - Debes dinerito 😭</Text>
        <Text fontSize="xs">Valor en negativo - ¡Te deben dinerito! 🦄</Text>
      </Box>

      <List spacing={2} paddingTop={2}>
        {Object.keys(totalWithDebts).map((userId) => (
          <Fragment key={userId}>
            <ListItem>
              <Text>
                <b>{totalWithDebts[userId].name}</b>
              </Text>
              <Text>
                <b>Total pagado:</b> {totalWithDebts[userId].total.toFixed(2)} €
              </Text>
              <Text>
                <b>A deber:</b> {totalWithDebts[userId].owns.toFixed(2)} €
              </Text>
            </ListItem>

            <Divider paddingTop={1} />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Payments;
