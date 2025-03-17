import React from "react";
import nobleCause from "./assets/nobleCause.jpg";
import styles from "./styles/nobelCauseComponent.module.css";

const NobelCauseComponent = () => {
  return (
    <React.Fragment>
      <div className={`col-12 m-auto ${styles.container}`}>
        <h1 className={styles.header}>Become a part of a noble cause</h1>
        <p className={styles.para}>
          Join us in making a difference in the world. By contributing to our noble cause, you are helping to support initiatives that bring positive change to communities in need. Whether it's providing education, healthcare, or disaster relief, your support can make a significant impact. Together, we can create a better future for everyone.
        </p>
        <img className={styles.image} src={nobleCause} alt="noble cause" />
      </div>
    </React.Fragment>
  );
};

export default NobelCauseComponent;
