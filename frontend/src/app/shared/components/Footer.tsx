import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import styles from "./styles/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footerContent}>
      <h1>Developed by Matheus Viana</h1>
      <div className={styles.icons}>
        <Link
          to={"https://www.linkedin.com/in/matheusmartinsviana/"}
          target="_blank"
        >
          <FaLinkedinIn />
        </Link>
        <Link to={"https://github.com/matheusmartinsviana"} target="_blank">
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
