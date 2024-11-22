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
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Organization, OrganizationFormData } from '@/types/organization';

const COLLECTION = 'organizations';

export async function getOrganization(id: string) {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Organization : null;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
}

export async function getOrganizations() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
    );
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Organization[];
  } catch (error) {
    console.error('Error fetching organizations:', error);
    // If network error, try to reconnect
    if (error.code === 'unavailable') {
      try {
        await enableNetwork(db);
        const querySnapshot = await getDocs(
          query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
        );
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Organization[];
      } catch (retryError) {
        console.error('Error retrying fetch:', retryError);
        throw retryError;
      }
    }
    throw error;
  }
}

export async function createOrganization(data: OrganizationFormData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      users: [],
      userCount: 0,
      stripeCustomerId: '',
      orgCheck: false,
      codeCheck: false,
      profileCheck: false,
      companyCamId: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

export async function updateOrganization(id: string, data: Partial<Organization>) {
  try {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
}

export async function deleteOrganization(id: string) {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
}

export function subscribeToOrganization(id: string, callback: (org: Organization | null) => void) {
  return onSnapshot(
    doc(db, COLLECTION, id),
    (doc) => {
      callback(doc.exists() ? { id: doc.id, ...doc.data() } as Organization : null);
    },
    (error) => {
      console.error('Error subscribing to organization:', error);
      callback(null);
    }
  );
}

export function subscribeToOrganizations(callback: (orgs: Organization[]) => void) {
  return onSnapshot(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),
    (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Organization[]);
    },
    (error) => {
      console.error('Error subscribing to organizations:', error);
      callback([]);
    }
  );
}