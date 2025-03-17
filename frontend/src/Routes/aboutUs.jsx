import React from "react";
import NavBar from "../Components/navbar_notLanding";
import ScrollToTop from "../Components/scrollToTop";
import aboutUsIIITM from "../Components/assets/aboutUs-iiitm.png";
import styles from "../Components/styles/aboutUs.module.css";

const AboutUs = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ScrollToTop />
      <div className={styles.container}>
        <h1 className={styles.header}>About Us</h1>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={aboutUsIIITM}
            alt="aboutUs- IIITM Block View"
          />
        </div>
        <p className={styles.content}>
          <br />
          "Empowering Dreams, One Contribution at a Time!"

          At Crowdfunding, we believe in the power of community and collective action. Our mission is to connect passionate individuals, innovators, and changemakers with the support they need to turn their dreams into reality. Whether it’s funding a creative project, supporting a social cause, or launching a startup, we provide a space where every contribution makes a difference.
          <br />
          <br />
          Join us in making a difference, one contribution at a time!
          <br />
        </p>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;