import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    const reference = collection(db, "customers");
    const dbQuery = query(reference, orderBy("number", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;

      // Load data to Array
      setCustomers(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();

          // // Convert Date
          // if (doc.data().dob != null && doc.data().dob !== "undefined") {
          //   data.dob = data.dob.toDate();
          // }

          return {
            id: doc.id,
            index: i++,
            ...data,
          };
        })
      );
    });
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  let sharedState = {
  customers
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
};
export default AppContext;