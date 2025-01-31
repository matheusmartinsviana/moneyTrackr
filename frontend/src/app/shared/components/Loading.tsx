/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./styles/Loading.module.css";

export const Loading: React.FC = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.loading}>
      <span>
        Projeto ainda em desenvolvimento, fique a vontade para{" "}
        <a href="mailto:matheusmviana@outlook.com.br" target="_blank">
          me enviar insights e melhorias
        </a>
        .
      </span>
      <section className={styles.appInfo}>
        <h1 title="Rastreie suas finanças, alcance seus objetivos.">
          Money Trackr
        </h1>
        <p>Rastreie suas finanças, alcance seus objetivos.</p>
      </section>
      <p className={styles.redirect}>Redirecionando em {seconds}...</p>
    </div>
  );
};

export default Loading;
