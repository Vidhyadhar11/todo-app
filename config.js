import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXRO4WtuQ-LzCTw2QVALavzKUIYAlb1K8",
    authDomain: "todo-1aaac.firebaseapp.com",
    projectId: "todo-1aaac",
    storageBucket: "todo-1aaac.appspot.com",
    messagingSenderId: "405528428276",
    appId: "1:405528428276:web:f912e0627d0b85ca18a8a1",
    measurementId: "G-FWTW7EGG3D"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };