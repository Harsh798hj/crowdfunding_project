import React from "react";
import ChildImage from "./assets/whyUsSection-happyKids.jpg";
import styles from "./styles/whyUsSection.module.css";

const WhyUs = () => {
  return (
    <React.Fragment>
      <div className="row col-12">
        <div className={`col-md-8 ${styles.whyUs}`}>
          <h1 className={styles.header}>Why Us?</h1>
          <p className={styles.para}>
            At Crowdfunding, we are dedicated to empowering individuals and communities to bring their dreams to life. Here’s why you should choose us:
            <br /><br />
            <strong>1.</strong> We believe in the power of collective action and community support. Our platform is designed to foster collaboration and connection.
            <br /><br />
            <strong>2.</strong> From creative endeavors to social causes and innovative startups, we support a wide range of projects that make a positive impact.
            <br /><br />
            <strong>3.</strong> Our platform is easy to navigate, making it simple for you to create, manage, and support projects.
            <br /><br />
            <strong>4.</strong> We prioritize the security of your contributions with robust payment processing and data protection measures.
            <br /><br />
            <strong>5.</strong> Join a community of successful project creators and backers who have turned their visions into reality with our support.
            <br /><br />
            Choose Crowdfunding to make a difference, one contribution at a time.
          </p>
        </div>
        <div className="col-md-4">
          <img className={styles.image} src={ChildImage} alt="HappyKids" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyUs;
