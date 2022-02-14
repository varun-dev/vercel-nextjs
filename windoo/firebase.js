export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'windoo.firebaseapp.com',
  databaseURL:
    process.env.NEXT_PUBLIC_DEVMODE === 'true'
      ? 'http://localhost:9000/?ns=windoo'
      : 'https://windoo-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'windoo',
  storageBucket: 'windoo.appspot.com',
  messagingSenderId: '796080430920',
  appId: '1:796080430920:web:341b16451ca4c096225d7d',
  // measurementId: 'G-7CK3RFXT7F',
}
