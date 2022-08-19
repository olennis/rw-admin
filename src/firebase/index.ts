import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: `${process.env.projectId}.firebaseapp.com`,
  storageBucket: `${process.env.projectId}.appspot.com`,
  projectId: `${process.env.projectId}`,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const membersCol = collection(db, "members");

const getMembers = async () => {
  const memberSnapshot = await getDocs(membersCol);
  const memberList = memberSnapshot.docs.map((doc) => doc.data());
  return memberList;
};

const setMembers = async (
  name: string,
  position: string,
  subPosition: string
) => {
  const memberSnapshot = await addDoc(membersCol, {
    name,
    position,
    subPosition,
  });
  return memberSnapshot;
};

export { getMembers, setMembers };
