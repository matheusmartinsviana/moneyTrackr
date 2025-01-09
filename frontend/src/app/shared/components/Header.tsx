import { useState, useEffect } from "react";
import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { GrAnalytics, GrHomeRounded } from "react-icons/gr";

const Header = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (windowWidth >= 768) {
      interval = window.setInterval(() => {
        setShowTitle((prev) => !prev);
      }, 5000);
    } else {
      setShowTitle(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [windowWidth]);

  return (
    <div
      className={`${styles.headerContainer} ${
        isScrolled && windowWidth < 768 ? styles.scrolled : ""
      }`}
    >
      <header className={styles.header}>
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
        {windowWidth >= 768 ? (
          <nav className={styles.navbarContainer}>
            <Link to="/gerenciar-financias">Gerenciar finanças</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        ) : (
          <nav className={styles.navbarContainer}>
            <Link to="/">
              <GrHomeRounded />
            </Link>
            <Link to="/gerenciar-financias">
              <MdDashboardCustomize />
            </Link>
            <Link to="/dashboard">
              <GrAnalytics />
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
