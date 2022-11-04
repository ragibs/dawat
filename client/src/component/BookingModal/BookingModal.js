import "./BookingModal.scss";
import Button from "@mui/material/Button";
import alternateLogo from "../../assets/Logo/logo-alternate.png";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { db } from "../../firebase.config";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function BookingModal({ setBookingModal, bookingInfo }) {
  const cancelHandler = () => {
    //if we click on X or cancel, the modal will close
    setBookingModal(false);
  };
  const { user } = UserAuth();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUserId(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  let uniqueId = uniqid();

  const submitHandlr = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "reservation", uniqueId), {
      listingId: `${bookingInfo[0]}`,
      bookingDate: `${bookingInfo[1]}`,
      totalGuests: `${bookingInfo[2]}`,
      hostFName: `${bookingInfo[3]}`,
      totalPaid: `${bookingInfo[4]}`,
      hostAvatar: `${bookingInfo[5]}`,
      guestId: `${userId}`,
      reservationId: `${uniqueId}`,
      city: `${bookingInfo[6]}`,
      country: `${bookingInfo[7]}`,
    });
    navigate(`/reservation`);
  };

  console.log(userId);

  return (
    <AnimatePresence>
      <div className="bookingModal-bg">
        <motion.div
          className="bookingModal-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
        >
          <div className="bookingModal__top-container">
            {/* {edit from here} */}
            <section className="bookingModal-left-contianer">
              <img className="logo" src={alternateLogo} alt="" />
            </section>
            <section className="bookingModal__text-container">
              <h2 className="bookingModal__title">
                Book your dawat experience with {bookingInfo[3]} for{" "}
                {bookingInfo[1]}?
              </h2>

              <div>
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardName"
                      label="Name on card"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardNumber"
                      label="Card number"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="expDate"
                      label="Expiry date"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cvv"
                      label="CVV"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <h2>
                  Your total for {bookingInfo[2]} guests: ${bookingInfo[4]}
                </h2>
              </div>
            </section>
          </div>
          <div className="bookingModal__btn-container">
            <Button
              variant="contained"
              color="error"
              onClick={cancelHandler}
              className="bookingModal__btn bookingModal__btn-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={submitHandlr}
              variant="contained"
              className="bookingModal__btn bookingModal__btn-booking "
            >
              CONFIRM BOOKING
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default BookingModal;
