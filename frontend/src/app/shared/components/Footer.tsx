import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import styles from "./styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContent}>
      <h1>Developed by Matheus Viana</h1>
      <div className={styles.icons}>
        <FaLinkedinIn />
        <FaGithub />
      </div>
    </footer>
  );
};

export default Footer;
