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
interface SongBook {
  id: number;
  title: string;
  src: string;
  code: string;
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
const membersCollection = collection(db, "members");
const songbooksCollection = collection(db, "songbooks");

const getMembers = async () => {
  const memberSnapshot = await getDocs(membersCollection);
  const memberList = memberSnapshot.docs.map((doc) => doc.data()) as Member[];
  return memberList;
};

const getSongBooks = async () => {
  const songbookSnapShot = await getDocs(songbooksCollection);
  const songbookList = songbookSnapShot.docs.map((doc) =>
    doc.data()
  ) as SongBook[];
  return songbookList;
};

const setMember = async (
  id: number,
  name: string,
  position: string,
  subPosition: string
) => {
  const memberSnapshot = await addDoc(membersCollection, {
    id,
    name,
    position,
    subPosition,
  });
  return memberSnapshot;
};

const setSongbook = async (
  id: number,
  title: string,
  code: string,
  src: string
) => {
  const songbookSnapshot = await addDoc(songbooksCollection, {
    id,
    title,
    code,
    src,
  });
  return songbookSnapshot;
};

export { getMembers, getSongBooks, setMember, setSongbook };
