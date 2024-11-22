import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '@/types';

const COLLECTION = 'users';

export async function getUser(id: string) {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
}

export async function getUsersByOrganization(orgId: string) {
  const q = query(
    collection(db, COLLECTION),
    where('orgId', '==', orgId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
}

export async function createUser(data: Omit<User, 'id'>) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateUser(id: string, data: Partial<User>) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteUser(id: string) {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}

export function subscribeToUser(id: string, callback: (user: User | null) => void) {
  return onSnapshot(doc(db, COLLECTION, id), (doc) => {
    callback(doc.exists() ? { id: doc.id, ...doc.data() } as User : null);
  });
}

export function subscribeToOrganizationUsers(orgId: string, callback: (users: User[]) => void) {
  const q = query(
    collection(db, COLLECTION),
    where('orgId', '==', orgId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[]);
  });
}