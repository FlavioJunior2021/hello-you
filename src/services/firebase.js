import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDSFt_SgPAIh4ypBH0TqFDT3CQcqk4eevw",
    authDomain: "hello-you-web.firebaseapp.com",
    databaseURL: "https://hello-you-web-default-rtdb.firebaseio.com",
    projectId: "hello-you-web",
    storageBucket: "hello-you-web.appspot.com",
    messagingSenderId: "59302195399",
    appId: "1:59302195399:web:e258a1c76ae3c63d80cee2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

