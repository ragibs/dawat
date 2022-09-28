import "./WhatIsDawat.scss";
import logo from "../../assets/Logo/Untitled-2.png";
import image from "../../assets/images/what_is_dawat-removebg.png";
import cooking from "../../assets/images/Chef_Two Color.svg";
import guy from "../../assets/images/Open map_Two Color.svg";
import video from "../../assets/videos/pexels-cottonbro-5791748.mp4";

function WhatIsDawat() {
  return (
    <div>
      <section className="whatIsDawat-container">
        <div className="left__container">
          <img className="right__container-svg guy-svg" src={guy} alt="" />
          <img className="left__container-image" src={image} alt="" />
          <img className="right__container-svg lady-svg" src={cooking} alt="" />

          <svg
            className="arrow-svg"
            width="110"
            height="33"
            viewBox="0 0 110 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.734436 32.0433C28.1185 20.8631 58.321 14.4162 87.6991 11.2271C93.6909 10.5767 99.7856 10.1329 105.681 8.82643C106.565 8.6305 107.666 8.45126 108.257 7.71167"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            ></path>
            <path
              d="M105.295 7.55369C103.251 6.41332 98.0697 4.73081 97.3989 2.01718C97.3762 1.92544 97.3095 1.31771 97.3374 1.37859C98.1737 3.20315 97.6004 7.32036 97.4208 9.32238C97.3735 9.84973 96.396 15.3811 96.8612 15.1485C101.235 12.9619 105.361 8.83254 109.442 6.05271"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
            ></path>
          </svg>

          {/* <h1 className="left__title">what is</h1>
          <div className="left__logo-title-container">
            <img className="logo" src={logo} alt="" />
            <p className="left__text">
              Dawat is an online platform where users/guests can book authentic
              home-cooked meal experiences with hosts from all around the world.{" "}
            </p>
          </div> */}
        </div>
        <div className="right__container">
          <video
            className="body-video"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
      </section>
    </div>
  );
}

export default WhatIsDawat;
