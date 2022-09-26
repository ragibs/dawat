import "./Reservation.scss";
import Header from "../../component/Header/Header";
import { db } from "../../firebase.config";
import { UserAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

function Reservation() {
  const { user } = UserAuth();
  const [guestId, setGuestId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [data, setData] = useState([]);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    const uid = user.uid;
    const displayName = user.displayName;
    setGuestName(displayName);
    setGuestId(uid);
    console.log(displayName);
    console.log(guestName);
  });

  //collection ref
  const colRef = collection(db, "reservation");
  //queries
  const q = query(colRef, where("guestId", "==", `${guestId}`));

  useEffect(() => {
    getSearch();
  }, [guestId]);

  const getSearch = () => {
    getDocs(q)
      .then((snapshot) => {
        let searchList = [];
        snapshot.docs?.forEach((doc) => searchList.push({ ...doc.data() }));
        setData(searchList);
      })
      .catch((error) => console.log(error));
  };

  console.log(data);

  return (
    <div>
      <Header />
      <h1>Hi,</h1>
      {data?.map((content) => (
        <ul key={content.reservationId}>
          <li>{content.totalPaid}</li>
          <li>{content.bookingDate}</li>
          <li>{content.totalGuests}</li>
        </ul>
      ))}
    </div>
  );
}

export default Reservation;
