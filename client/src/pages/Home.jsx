export const Home = () => {
  return (
    <>
      <main className=".content-container">
        <section className="section-hero" id="hero-section">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>WELCOME TO CODIFY</h1>
              <div className="abc">LET'S CODIFY IT</div>
              <br />
              <p>
                Codify is a premier online coding judge platform, designed to
                challenge and elevate your programming skills. Codify provides
                you a diverse range of coding problems.
              </p>
              <p>
                What are you waiting for!! Sign up today and start your coding
                adventure with Codify.
              </p>
              <div className="btn btn-group">
                <a href="/register">
                  <button className="btn">Join Today</button>
                </a>
                <a href="#analytics-section">
                  <button className="btn secondary-btn">Learn more</button>
                </a>
              </div>
            </div>
            {/*hero images*/}
            <div className="hero-image">
              <img
                src="/images/pic1.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
      {/*2nd section*/}
      <section className="section-analytics" id="analytics-section">
        <div className="container grid grid-three-cols">
          <div className="div1">
            <h2>2000+</h2>
            <p>Problems</p>
          </div>
          <div className="div1">
            <h2>3000+</h2>
            <p>Already Registered</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>Community Support</p>
          </div>
        </div>
      </section>
      {/*3rd section*/}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/*hero images*/}
          <div className="hero-image">
            <img
              src="/images/pic2.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>
          {/*hero content*/}
          <div className="hero-content">
            <p>HELLO PROGRAMMERS</p>
            <h1>DEEP DIVE INTO CODIFY</h1>
            <div className="abc">LET'S CODIFY IT</div>
            <br />
            <p>
              Dive into a world of programming, improve your skills, and connect
              with a community of passionate developers. Let's code, compete,
              and create amazing solutions together
            </p>
            <div className="abc">
              ALREADY REGISTERED ?? LOGIN NOW AND BOOST YOUR CODING SKILLS
            </div>
            <div className="btn btn-group">
              <a href="/login">
                <button className="btn">LOGIN</button>
              </a>
              <a href="#hero-section">
                <button className="btn secondary-btn">Learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
