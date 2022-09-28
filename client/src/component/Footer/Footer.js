import "./Footer.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/logo-alternate.png";
import facebook from "../../assets/Icons/Icon-facebook.svg";
import twitter from "../../assets/Icons/Icon-twitter.svg";
import instagram from "../../assets/Icons/Icon-instagram.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <div className="footer__top">
          <div className="footer__top-left">
            <h2 className="footer__title">Connect with us!</h2>
            <div className="footer__social">
              <Link className="footer__icon" to="http://www.instagram.com">
                <img
                  className="footer__icon-svg"
                  src={instagram}
                  alt="footer icon instagram"
                />
              </Link>
              <Link className="footer__icon" to="https://www.facebook.com/">
                <img
                  className="footer__icon-svg"
                  src={facebook}
                  alt="footer icon facebook"
                />
              </Link>
              <Link className="footer__icon" to="https://www.twitter.com/">
                <img
                  className="footer__icon-svg"
                  src={twitter}
                  alt="footer icon twitter"
                />
              </Link>
            </div>
          </div>
          <Link to="/" className="navigation__logo navigation__logo--desktop">
            <img className="logo" src={logo} alt="footer logo bandsite" />
          </Link>
        </div>

        <div className="footer__copyright footer__copyright--tablet">
          Copyright dawat.com © 2022 All Rights Reserved
        </div>
      </div>
      <div className="footer__right">
        <div className="footer__copyright footer__copyright--moible">
          Copyright dawat.com © 2022 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
