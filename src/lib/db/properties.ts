import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Property } from '@/types';

const COLLECTION = 'properties';

export async function getProperty(id: string): Promise<Property | null> {
  try {
    // For now, use mock data
    const mockProperty = (await import('../mock/properties')).mockProperties
      .find(p => p.id === id);
    return mockProperty || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    // For now, use mock data
    const { mockProperties } = await import('../mock/properties');
    return mockProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export function subscribeToProperties(
  orgId: string,
  callback: (properties: Property[]) => void
) {
  const q = query(
    collection(db, COLLECTION),
    where('org.__ref__', '==', `organization/${orgId}`),
    orderBy('created_at', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
    callback(properties);
  });
}

export function subscribeToProperty(
  id: string,
  callback: (property: Property | null) => void
) {
  return onSnapshot(doc(db, COLLECTION, id), (doc) => {
    callback(doc.exists() ? { id: doc.id, ...doc.data() } as Property : null);
  });
}