import "./OurPicks.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fontWeight } from "@mui/system";

function OurPicks() {
  const [data, setData] = useState([]);

  const getSearch = async () => {
    let ourPicksList = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
      ourPicksList.push({ ...doc.data() });
      ourPicksList.splice(5, 2);
      setData(ourPicksList);
    });
  };
  useEffect(() => {
    getSearch();
  }, []);
  console.log(data);
  return (
    <div className="ourPicks">
      <h1 className="ourPicks__title">
        Our Picks
        <span style={{ color: "#97c680", fontFamily: "Inter" }}>.</span>
        <svg
          width="25"
          height="91"
          viewBox="0 0 99 91"
          fill="#feba88"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46.5897 90C32.2617 82.5795 21.668 75.8216 13.4112 62.0208C9.00167 54.6506 4.91717 47.0127 2.69169 38.6607C-0.54097 26.5288 0.793624 10.3852 12.9895 3.52983C28.1392 -4.9859 49.2008 9.31642 45.2853 26.7698C45.1636 27.3123 43.6421 30.6293 44.4297 28.79C48.6716 18.8834 61.263 9.74938 71.1476 6.48662C86.7877 1.32402 97.7846 9.63273 97.1912 26.0637C96.7624 37.9369 88.4709 51.895 80.1949 60.0373C70.4344 69.6401 57.315 75.4033 50.4294 87.5728"
            stroke="#000000"
            stroke-width="1.83638"
            stroke-linecap="round"
          ></path>
        </svg>
      </h1>
      <p className="ourPicks__subtext">
        ‘Our Picks’ consists of some of our favorite hosts who are known for
        their genuine hospitality and hosts who made guests feel
        <span style={{ color: "#feba88", fontWeight: "700" }}>
          {" "}
          welcomed
        </span>{" "}
        from the moment they walked through the door.
      </p>
      <section className="card-list">
        {data?.map((content) => (
          <Link
            className="card"
            key={content.listingId}
            to={`/${content.listingId}`}
          >
            <header className="card-header">
              <h2 className="card-h2">
                {content.hostFName} {content.hostLName}
              </h2>
              <p className="card-quote">{content.hostQuote}</p>
            </header>
            <div className="card-host">
              <img
                className="host-avatar"
                src={content.hostAvatar}
                alt="host avatar"
              />
              <div className="host-name">
                <div className="host-name-prefix">{content.city}</div>
                {content.country}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default OurPicks;
