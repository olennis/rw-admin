import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

interface Member {
  id: number;
  name: string;
  position: string;
  attendance: boolean[];
  subPosition: string;
}

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
  const memberList = memberSnapshot.docs.map((doc) => doc.data()) as Member[];
  return memberList;
};
getMembers();

const setMember = async (
  id: number,
  name: string,
  position: string,
  subPosition: string
) => {
  const memberSnapshot = await addDoc(membersCol, {
    id,
    name,
    position,
    subPosition,
  });
  return memberSnapshot;
};

export { getMembers, setMember };
