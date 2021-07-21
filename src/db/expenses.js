import firebase from '../config/firebase';

const EXPENSES_COLLECTION = 'expenses';

export const getUserExpenses = async (userId) => {
  const snapshots = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .where('userId', '==', userId)
    .get();

  if (snapshots.empty) {
    return [];
  }

  const results = snapshots.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return results;
};

export const getExpenseById = async (expenseId) => {
  const doc = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .doc(expenseId) // Recupera un elemento por su id de firestore
    .get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const createNewExpense = async (expense) => {
  const { id, ...restExpense } = expense;

  const doc = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .add(restExpense);

  // Recupero lo que acabo de guardar en firestore
  const savedDoc = await doc.get();

  return {
    id: doc.id,
    ...savedDoc.data(),
  };
};

export const updateExpenseById = async (expenseId, expense) => {
  await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .doc(expenseId)
    .update(expense);
};
