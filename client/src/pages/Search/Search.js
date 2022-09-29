import "./Search.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../../component/Header/Header";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapBoxMarker from "../../assets/Icons/mapbox-marker-icon-pink.svg";
import { motion } from "framer-motion";

function Search() {
  const [data, setData] = useState([]);
  const { cityId } = useParams();

  //to properly format the search word
  const searchFunction = (word) => {
    let obj = word.split("");
    let rest = obj.slice(1);
    let finalWord = obj[0].toUpperCase() + rest.join("").toLowerCase();
    return finalWord;
  };

  let searchWord = searchFunction(cityId);

  //collection ref
  const colRef = collection(db, "listings");

  //queries

  const q = query(colRef, where("city", "==", `${searchWord}`));

  useEffect(() => {
    getSearch();
  }, [cityId]);

  const getSearch = () => {
    getDocs(q)
      .then((snapshot) => {
        let searchList = [];
        snapshot.docs?.forEach((doc) => searchList.push({ ...doc.data() }));
        setData(searchList);
      })
      .catch((error) => console.log(error));
  };

  //mapGenerator
  let mapGenetaor;
  if (data.length !== 0) {
    mapGenetaor = (
      <ReactMapGL
        className="search-map-map"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: data[0].geo._long,
          latitude: data[0].geo._lat,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {data.map((location) => (
          <Marker
            key={location.listingId}
            latitude={location.geo._lat}
            longitude={location.geo._long}
          >
            <button className="marker-btn">
              <img src={mapBoxMarker} alt="" />
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    );
  } else {
    mapGenetaor = (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <h1 className="search__result-header">
        {data.length} invites were found with the search criteria {searchWord}
      </h1>
      <div className="searchlist-component">
        <div className="searchlist__container">
          {data?.map((content) => (
            <Link
              key={content.listingId}
              to={`/${content.listingId}`}
              className="search-card"
            >
              <header className="search-card-header">
                <h2 className="search-card-h2">{content.title}</h2>
                <p>{content.hostBio}</p>
              </header>
              <div className="search-card-host">
                <img
                  className="search-host-avatar"
                  src={content.hostAvatar}
                  alt=""
                />
                <div className="search-host-name">
                  <div className="search-host-name-prefix">{content.city}</div>
                  {content.hostFName} {content.hostLName}
                </div>
              </div>
              <div className="search__price-container">
                <h2 className="search__price">From ${content.price}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="search__map">{mapGenetaor}</div>
      </div>
    </motion.div>
  );
}

export default Search;
