import "./Listing.scss";
import { db } from "../../firebase.config";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { useParams } from "react-router-dom";

function Listing() {
  const { listingId } = useParams();
  const [currentListing, setCurrentListing] = useState([]);
  //collection ref
  const colRef = collection(db, "listings");

  //queries

  const q = query(colRef, where("listingId", "==", `${listingId}`));

  useEffect(() => {
    getSearch();
  }, []);

  const getSearch = () => {
    getDocs(q)
      .then((snapshot) => {
        let searchList = [];
        snapshot.docs?.forEach((doc) => setCurrentListing(doc.data()));
      })
      .catch((error) => console.log(error));
  };

  console.log(currentListing);
  console.log(currentListing.hostAvatar);

  return (
    <div>
      <h1>{currentListing.title}</h1>
      <h3>Hosted By</h3>
      <h2>{currentListing.hostFName}</h2>
      <img
        className="userAvatar"
        src="https://firebasestorage.googleapis.com/v0/b/react-dashboard-8dd22.appspot.com/o/bangkok%20listing%201%2Fhost%20portrait.jpg?alt=media&token=b6d58fb3-013f-4cd6-99b5-2cb9475ad6a6"
        alt=""
      />
      <h3>About your host</h3>
      <p>{currentListing.hostBio}</p>
      <h3>Description</h3>
      <p>{currentListing.description}</p>
      <button>BOOK</button>
    </div>
  );
}

export default Listing;
