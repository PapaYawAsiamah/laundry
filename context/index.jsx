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
  const [wash, setWash] = useState([]);
  const [amounts, setAmounts] = useState([])
  const [paid, setPaid] = useState([])

  const fetchCustomers = () => {
    const reference = collection(db, "customers");
    const dbQuery = query(reference, orderBy("index", "asc"));

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
          // if (doc.data(). createdAt != null) {
          //   data.date = data. createdAt.toDate().toLocaleDateString("en-US");
          // } else {
          //   console.log("else");
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
  const fetchWash = () => {
    const reference = collection(db, "wash");
    const dbQuery = query(reference, orderBy("index", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;

      // Load data to Array
      setWash(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();

          // // Convert Date
          // if (doc.data().dob != null && doc.data().dob !== "undefined") {
          //   data.dob = data.dob.toDate();
          // }
          if (doc.data(). createdAt != null) {
            data. createdAt = data. createdAt.toDate().toLocaleDateString("en-US");
          } else {
            console.log("else");
          }

          return {
            id: doc.id,
            index: i++,
            ...data,
          };
        })
      );
    });
  };
  const fetchMoney = () => {
    const reference = collection(db, "amount");
    const dbQuery = query(reference, orderBy("id", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;

      // Load data to Array
      setAmounts(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();

          // // Convert Date
          // if (doc.data().dob != null && doc.data().dob !== "undefined") {
          //   data.dob = data.dob.toDate();
          // }
          if (doc.data(). createdAt != null) {
            data. createdAt = data. createdAt.toDate().toLocaleDateString("en-US");
          } else {
            console.log("else");
          }

          return {
            id: doc.id,
            index: i++,
            ...data,
          };
        })
      );
    });
  };
  const fetchPaid = () => {
    const reference = collection(db, "paid");
    const dbQuery = query(reference, orderBy("id", "asc"));

    onSnapshot(dbQuery, (querySnapshot) => {
      let i = 1;

      // Load data to Array
      setPaid(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();

          // // Convert Date
          // if (doc.data().dob != null && doc.data().dob !== "undefined") {
          //   data.dob = data.dob.toDate();
          // }
          if (doc.data(). createdAt != null) {
            data. createdAt = data. createdAt.toDate().toLocaleDateString("en-US");
          } else {
            console.log("else");
          }

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
    fetchWash();
    fetchMoney();
    fetchPaid()
  }, []);

  let sharedState = {
    customers,
    wash,
    amounts,
    paid
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};
export default AppContext;
