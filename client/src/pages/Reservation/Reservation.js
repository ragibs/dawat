import "./Reservation.scss";
import Header from "../../component/Header/Header";
import { db } from "../../firebase.config";
import { UserAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Reservation() {
  const { user } = UserAuth();
  const [guestId, setGuestId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [data, setData] = useState([]);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    const uid = user.uid;
    setGuestId(uid);
  });

  //collection ref
  const colRef = collection(db, "reservation");
  const colRef2 = collection(db, "users");
  //queries
  const q = query(colRef, where("guestId", "==", `${guestId}`));
  const q2 = query(colRef2, where("userId", "==", `${guestId}`));

  const getName = () => {
    getDocs(q2)
      .then((snapshot) => {
        let searchList = [];
        snapshot.docs?.forEach((doc) => searchList.push(doc.data().firstName));
        setGuestName(searchList[0]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSearch();
    getName();
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
    <motion.div
      className="reservation-component"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <section className="reservation__container">
        <h1 className="reservation__title">Hi, {guestName}!</h1>
        <h2 className="reservation__subtitle">
          You currently have {data.length} reservation booked.
        </h2>
        {data?.map((content, index) => (
          <Accordion key={content.reservationId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>
                {index + 1}. Reservation with {content.hostFName} for{" "}
                {content.bookingDate} at {content.city}, {content.country}
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="reservation__text-container">
                  <div className="reservation__text-container-left">
                    <div className="listing__description-misc">
                      <div className="listing__misc-container">
                        <h3 className="listing__tags-small">
                          Confirmation Ref
                        </h3>
                        <p className="listing__text">{content.reservationId}</p>
                      </div>
                      <div className="listing__misc-container">
                        <h3 className="listing__tags-small">
                          Total Amount Paid
                        </h3>
                        <p className="listing__text">${content.totalPaid}</p>
                      </div>
                      <div className="listing__misc-container">
                        <h3 className="listing__tags-small">Total Guests</h3>
                        <p className="listing__text">{content.totalGuests}</p>
                      </div>
                      <div className="listing__misc-container">
                        <h3 className="listing__tags-small">Location</h3>
                        <p className="listing__text">
                          {content.city}, {content.country}
                        </p>
                      </div>
                      <div className="listing__misc-container">
                        <h3 className="listing__tags-small">
                          Reservation Date
                        </h3>
                        <p className="listing__text">{content.bookingDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="reservation__text-container-right"></div>
                  <h3 className="listing__tags">Hosted By</h3>
                  <div className="listing__name-image">
                    <Link
                      className="reservation__links"
                      to={`/${content.listingId}`}
                    >
                      {" "}
                      <img
                        className="search-host-avatar"
                        src={content.hostAvatar}
                        alt=""
                      />
                    </Link>
                    <h2 className="listing__hostFName">{content.hostFName}</h2>
                  </div>
                  <div className="bookingModal__btn-container">
                    <Button
                      variant="contained"
                      color="error"
                      className="bookingModal__btn bookingModal__btn-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="bookingModal__btn bookingModal__btn-booking "
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
    </motion.div>
  );
}

export default Reservation;
