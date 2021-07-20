import firebase from 'firebase';

const EXPENSES_COLLECTION = 'expenses';

export const getUserExpenses = async (userId) => {
  const snapshot = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .where('userId', '==', userId)
    .get();

  if (snapshot.empty) {
    return [];
  }

  // Transform snapshots into real data
  const results = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return results;
};

export const getExpenseById = async (expenseId) => {
  const snapshot = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .doc(expenseId)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const createUserExpense = async (expense) => {
  const doc = await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .add(expense);

  const data = {
    id: doc.id,
    // Query the element from the database after creating it
    ...(await doc.get()).data(),
  };

  return data;
};

export const saveExpenseChanges = async (expenseId, expense) => {
  await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .doc(expenseId)
    .update(expense);
};

export const deleteExpenseById = async (expenseId) => {
  await firebase
    .firestore()
    .collection(EXPENSES_COLLECTION)
    .doc(expenseId)
    .delete();
};
