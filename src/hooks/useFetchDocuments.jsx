import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        let q2;
        let q3;
        let q4;
        let q5;
        let q6;

        if (search) {
          q = await query(
            collectionRef,
            where('name', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );

          q2 = await query(
            collectionRef,
            where('cpf_cnpj', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );

          q3 = await query(
            collectionRef,
            where('email', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );

          q4 = await query(
            collectionRef,
            where('personType', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );

          q5 = await query(
            collectionRef,
            where('phone', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );

          q6 = await query(
            collectionRef,
            where('serviceType', '==', search), // parte não generica, mudar tags para outro nome caso necessario
            orderBy('createdAt', 'desc'),
          );
        } else {
          q = await query(collectionRef, orderBy('createdAt', 'desc'));
          q2 = await query(collectionRef, orderBy('createdAt', 'desc'));
          q3 = await query(collectionRef, orderBy('createdAt', 'desc'));
          q4 = await query(collectionRef, orderBy('createdAt', 'desc'));
          q5 = await query(collectionRef, orderBy('createdAt', 'desc'));
          q6 = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        await onSnapshot(q2, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        await onSnapshot(q3, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        await onSnapshot(q4, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        await onSnapshot(q5, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        await onSnapshot(q6, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
