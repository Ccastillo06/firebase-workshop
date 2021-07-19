import { v4 as uuid } from 'uuid';

export const getNewExpense = (title) => ({
  id: uuid(),
  title,
  expenses: [],
  participants: [],
});

export const mockAllExpenses = [
  {
    id: '012-345-678',
    title: 'Cumpleaños de Keanu Reeves',
    expenses: [
      {
        id: uuid(),
        title: 'Zapatillas de deporte',
        price: 120,
        paidBy: { id: '111-111-111', name: 'juan' },
      },
      {
        id: uuid(),
        title: 'Cena de grupo',
        price: 440,
        paidBy: { id: '222-222-222', name: 'claudia' },
      },
      {
        id: uuid(),
        title: 'Entradas discoteca',
        price: 85,
        paidBy: { id: '111-111-111', name: 'juan' },
      },
      {
        id: uuid(),
        title: 'Chupitos de Jagger',
        price: 30,
        paidBy: { id: '333-333-333', name: 'pepe' },
      },
    ],
    participants: [
      { id: '111-111-111', name: 'juan' },
      { id: '222-222-222', name: 'claudia' },
      { id: '333-333-333', name: 'pepe' },
    ],
  },
  {
    id: '014-345-678',
    title: 'Cumpleaños de Wonder Woman',
    expenses: [],
    participants: [
      { id: '111-111-111', name: 'bruce' },
      { id: '222-222-222', name: 'clark' },
      { id: '333-333-333', name: 'steve' },
    ],
  },
];
