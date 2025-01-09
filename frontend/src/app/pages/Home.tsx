import React from "react";
import styles from "./styles/Home.module.css";
import GeneralTable from "../shared/components/GeneralTable";

const Home: React.FC = () => {
  return (
    <>
      <section className={styles.homeContainer}>
        <GeneralTable />
      </section>
    </>
  );
};

export default Home;
