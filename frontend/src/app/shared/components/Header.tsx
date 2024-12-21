import { useState, useEffect } from "react";
import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    let interval;
    if (windowWidth >= 768) {
      interval = setInterval(() => {
        setShowTitle((prev) => !prev);
      }, 5000);
    } else {
      setShowTitle(true)
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <header className={styles.headerContainer}>
      <Link to="/">
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
      </Link>
      <nav className={styles.navbarContainer}>
        <Link to="/financias">Financias</Link>
      </nav>
    </header>
  );
};

export default Header;
