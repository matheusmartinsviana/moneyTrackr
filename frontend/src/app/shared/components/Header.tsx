import { useState, useEffect } from "react";
import styles from "./styles/Header.module.css";

const Header = () => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.headerContainer}>
      {showTitle ? (
        <h1
          className={styles.brandTitle}
          title="Rastreie suas finanças, alcance seus objetivos."
        >
          Money Trackr
        </h1>
      ) : (
        <p className={styles.brandSlogan}>
          Rastreie suas finanças, alcance seus objetivos.
        </p>
      )}
    </header>
  );
};

export default Header;
