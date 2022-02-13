// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
