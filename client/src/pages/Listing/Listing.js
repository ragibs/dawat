import "./Listing.scss";
import { db } from "../../firebase.config";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { useParams } from "react-router-dom";
import Header from "../../component/Header/Header";

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
      <Header />
      <div className="listing-container">
        <h1>{currentListing.title}</h1>
        <div className="listing__host-info">
          <h4>Hosted By</h4>
          <h2 className="listing__hostFName">{currentListing.hostFName}</h2>
          <img
            className="search-host-avatar"
            src={currentListing.hostAvatar}
            alt=""
          />
          <h4>About your host</h4>
          <p>{currentListing.hostBio}</p>
        </div>
        <div className="listing__info">
          <h4>Description</h4>
          <p className="listing__description">{currentListing.description}</p>
          <div className="listing__description-misc"></div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
