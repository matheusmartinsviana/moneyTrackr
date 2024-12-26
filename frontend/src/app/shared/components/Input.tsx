import React, { InputHTMLAttributes } from "react";
import styles from "./styles/Input.module.css";

interface ReusableInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Para exibir um rótulo opcional
  errorMessage?: string; // Mensagem de erro opcional
}

const Input: React.FC<ReusableInputProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
