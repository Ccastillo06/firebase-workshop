import firebase from 'firebase';

export const uploadExpenseImage = async (file, filename) => {
  const storageRef = firebase.storage().ref();
  const expenseFileRef = storageRef.child(`images/${filename}`);

  const snapshot = await expenseFileRef.put(file);
  const downloadUrl = await snapshot.ref.getDownloadURL();

  return downloadUrl;
};
