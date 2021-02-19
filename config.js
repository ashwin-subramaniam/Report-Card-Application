import  firebase from 'firebase';
require('@firebase/firestore')
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

 const firebaseConfig = {
  apiKey: "AIzaSyAynpXM4VEOg6kVjHicUAY0sL_sslmfwgM",
  authDomain: "my-report-card-app.firebaseapp.com",
  projectId: "my-report-card-app",
  storageBucket: "my-report-card-app.appspot.com",
  messagingSenderId: "870940514715",
  appId: "1:870940514715:web:cfecc357728719883ea93e",
  measurementId: "G-T6T5VCTLYH"
 };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()
