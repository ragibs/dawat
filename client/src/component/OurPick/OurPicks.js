import "./OurPicks.scss";
import randomImage from "../../assets/images/randompotrait.jpg";

function OurPicks() {
  return (
    <div className="ourPicks">
      <h1 className="ourPicks__title">
        Our Picks
        <span style={{ color: "#97c680", fontFamily: "Inter" }}>.</span>
      </h1>
      <p className="ourPicks__subtext">
        ‘Our Picks’ consists of some of our favorite hosts who are known for
        their genuine hospitality and hosts who made guests feel
        <span style={{ color: "#feba88" }}> welcomed</span> from the moment they
        walked through the door.
      </p>
      <section className="card-list">
        <article className="card">
          <header className="card-header">
            <p>May 25th 2021</p>
            <h2 className="card-h2">Card tricks are fun!</h2>
          </header>
          <div className="card-host">
            <img className="host-avatar" src={randomImage} alt="" />
            <div className="host-name">
              <div className="host-name-prefix">London, UK</div>
              Jemma Delaney
            </div>
          </div>
        </article>
        <article className="card">
          <header className="card-header">
            <p>May 25th 2021</p>
            <h2 className="card-h2">Card tricks are fun!</h2>
          </header>
          <div className="card-host">
            <img className="host-avatar" src={randomImage} alt="" />

            <div className="host-name">
              <div className="host-name-prefix">London, UK</div>
              Jemma Delaney
            </div>
          </div>
        </article>
        <article className="card">
          <header className="card-header">
            <p>May 25th 2021</p>
            <h2 className="card-h2">Card tricks are fun!</h2>
          </header>
          <div className="card-host">
            <img className="host-avatar" src={randomImage} alt="" />
            <div className="host-name">
              <div className="host-name-prefix">London, UK</div>
              Jemma Delaney
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default OurPicks;
