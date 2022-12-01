import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, deleteField, setDoc } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYYYmzSmXiVtLmDP72ICt6qR9MUSGJeHQ",
  authDomain: "socialape-ee633.firebaseapp.com",
  databaseURL: "https://socialape-ee633-default-rtdb.firebaseio.com",
  projectId: "socialape-ee633",
  storageBucket: "socialape-ee633.appspot.com",
  messagingSenderId: "824788120052",
  appId: "1:824788120052:web:036b1d6b2d0e6648a409a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
onAuthStateChanged(auth, user => { /* check status */ });

// Get a list of cities from your database
async function getCities() {
  var users = []
  const citiesCol = collection(db, 'Users');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => users.push(doc.data()));
  return users;
} 
async function AddUser(user) {
  const citiesCol = collection(db, 'Users');
  var status = false;
  await addDoc(citiesCol,user).then(()=>{
    status = true;
    return true;
  }).catch((err)=>{
    status = false;
    return false;
  })
  return status;
}
async function updateUser(user) {
  const citiesCol = collection(db, 'Users',user.id);
  var status = false;
  await updateDoc(citiesCol,user).then(()=>{
    status = true;
    return true;
  }).catch((err)=>{
    status = false;
    return false;
  })
  return status;
}
async function deleteUser(user) {
  const citiesCol = collection(db, 'Users',user.id);
  var status = false;
  await deleteDoc(citiesCol).then(()=>{
    status = true;
    return true;
  }).catch((err)=>{
    status = false;
    return false;
  })
  return status;
}

export class firebase{
    constructor(){
      
    }
    async getClients(){
        return await getCities().then(results => results);
    }
    async addClient(details){
        return await AddUser(details).then((result) => result);
    }
    async updateUserDetails(user){
          updateUser(user);
    }
    async removeUser(user){
      deleteUser(user);
    }

    async updateData(clients){
        clients.forEach(element => {
          this.updateUserDetails(element)
        });
        return true;
    }
}