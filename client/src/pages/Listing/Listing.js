import "./Listing.scss";
import { db } from "../../firebase.config";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Map from "react-map-gl";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import BookingModal from "../../component/BookingModal/BookingModal";
import { motion } from "framer-motion";

function Listing() {
  const { listingId } = useParams();
  const [currentListing, setCurrentListing] = useState([]);
  const navigate = useNavigate();
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

  //object to load images from
  const itemData = [
    {
      img: `${currentListing.listingPhoto1}`,
      title: "Image 1",
    },
    {
      img: `${currentListing.listingPhoto2}`,
      title: "Image 2",
    },
    {
      img: `${currentListing.listingPhoto3}`,
      title: "Image 3",
    },
    {
      img: `${currentListing.listingPhoto4}`,
      title: "Image 4",
    },
    {
      img: `${currentListing.listingPhoto5}`,
      title: "Image 5",
    },
  ];

  //precaution as API takes long to load to give long and lat to mapbox
  let mapGenetaor;
  if (currentListing.geo !== undefined) {
    mapGenetaor = (
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: currentListing.geo._long,
          latitude: currentListing.geo._lat,
          zoom: 14,
        }}
        style={{ width: 400, height: 300, borderRadius: "5px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    );
  } else {
    mapGenetaor = (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  //datepicket
  const [value, setValue] = useState(null);
  // guest formfield loop function
  let guestAllowance = [];
  for (let i = currentListing.minG - 1; i < currentListing.maxG; i++) {
    guestAllowance.push(i + 1);
  }
  const [totalGuests, setTotalGuests] = useState(null);
  const handleChange = (event) => {
    setTotalGuests(event.target.value);
  };

  //booking modal stuff
  const [bookingModal, setBookingModal] = useState(false); //to control delete modal state
  const [bookingInfo, setBookingInfo] = useState([""]); // to pass booking info to modal

  //booking handlr

  const bookingHandlr = (listingId) => {
    let bookingDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(value.$d);

    setBookingInfo([
      listingId,
      bookingDate,
      totalGuests,
      currentListing.hostFName,
      totalGuests * currentListing.price,
      currentListing.hostAvatar,
      currentListing.city,
      currentListing.country,
    ]);
    setBookingModal(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />

      <div className="listing-container">
        {bookingModal && (
          <BookingModal
            setBookingModal={setBookingModal}
            bookingInfo={bookingInfo}
          />
        )}
        <section className="listing__left">
          <h1 className="listing__title">{currentListing.title}</h1>

          <Divider></Divider>
          <Box className="image__gallery">
            <ImageList
              variant="woven"
              sx={{
                width: { xs: 230, sm: 300, md: 400, lg: 500, xl: 600 },
                height: { xs: 270, sm: 300, md: 400, lg: 500, xl: 600 },
              }}
              cols={3}
            >
              {itemData.map((image, index) => (
                <ImageListItem key={index}>
                  <img src={image.img} alt={image.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </section>
        <Divider></Divider>
        <section className="listing__right">
          <div className="listing__main-info">
            <div className="listing__host-info">
              <div className="listing__top">
                <h5 className="listing__tags">Hosted By</h5>
                <div className="back-button-desktop">
                  <Button
                    className="back-button-desktop"
                    variant="text"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
              <div className="listing__name-image">
                <img
                  className="search-host-avatar"
                  src={currentListing.hostAvatar}
                  alt=""
                />
                <h2 className="listing__hostFName">
                  {currentListing.hostFName}
                </h2>
              </div>
              <Divider></Divider>
              <h5 className="listing__tags">About your host</h5>
              <p className="listing__text">{currentListing.hostBio}</p>
            </div>
            <div className="listing__info">
              <h5 className="listing__tags">Description</h5>
              <p className="listing__text">{currentListing.description}</p>
            </div>
          </div>
          <Divider></Divider>

          <div className="listing__description-misc">
            <div className="listing__misc-container">
              <h5 className="listing__tags-small">Price per guest</h5>
              <p className="listing__text">${currentListing.price}</p>
            </div>
            <div className="listing__misc-container">
              <h5 className="listing__tags-small">Maximum guests</h5>
              <p className="listing__text">{currentListing.maxG}</p>
            </div>
            <div className="listing__misc-container">
              <h5 className="listing__tags-small">Minimum guests</h5>
              <p className="listing__text">{currentListing.minG}</p>
            </div>
            <div className="listing__misc-container">
              <h5 className="listing__tags-small">Location</h5>
              <p className="listing__text">
                {currentListing.city}, {currentListing.country}
              </p>
            </div>
          </div>
          <div className="map">{mapGenetaor}</div>

          <div className="listing__booking-container">
            <h2 className="bookingForm__title">
              Book {currentListing.hostFName}
            </h2>
            <FormControl className="bookingForm">
              <div className="bookingForm-left">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="bookingForm__field"
                    required
                    label="Choose a date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  style={{ marginTop: "1rem" }}
                  className="bookingForm__field"
                  id="outlined-select-currency"
                  select
                  label="Number of guests"
                  defaultValue=""
                  onChange={handleChange}
                  helperText="Please select total number of guests"
                  required
                >
                  {guestAllowance.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="bookingForm-right">
                <h3 className="bookingForm__total">
                  Your total is ${currentListing.price * totalGuests}
                </h3>
                <div className="button-container">
                  <Button
                    disabled={value === null || totalGuests === null}
                    onClick={() => bookingHandlr(currentListing.listingId)}
                    variant="contained"
                    size="large"
                    type="submit"
                    color="secondary"
                  >
                    BOOK
                  </Button>
                </div>
              </div>
            </FormControl>
          </div>
          <div className="back-button-container">
            <Button
              className="back-button-mobile"
              variant="text"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Listing;
