import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlp35rxzFPPblpoY9BPrNMGDVU_yans2k',
  authDomain: 'split-and-share-f3d10.firebaseapp.com',
  projectId: 'split-and-share-f3d10',
  storageBucket: 'split-and-share-f3d10.appspot.com',
  messagingSenderId: '957784286963',
  appId: '1:957784286963:web:57e14a3eeb7fb906b6b986',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
