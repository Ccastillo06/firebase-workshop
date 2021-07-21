import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBMkeyBQz8kJTfuXLBxyFXtizMe6TJpOfg',
  authDomain: 'split-and-share-workshop.firebaseapp.com',
  projectId: 'split-and-share-workshop',
  storageBucket: 'split-and-share-workshop.appspot.com',
  messagingSenderId: '290498709575',
  appId: '1:290498709575:web:3eef8d8abaa92984020962',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
