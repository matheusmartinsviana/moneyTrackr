import React, { useState, useEffect } from "react";
import styles from "./styles/Earnings.module.css";
import Input from "./Input";
import Button from "./Button";
import { MotionDiv } from "./common/motion-wrapper";

const Earnings: React.FC = () => {
  const [earnings, setEarnings] = useState<
    { value: number; description: string }[]
  >([]);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedEarnings = localStorage.getItem("earnings");
    if (storedEarnings) {
      setEarnings(JSON.parse(storedEarnings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("earnings", JSON.stringify(earnings));
  }, [earnings]);

  const addEarning = () => {
    if (value && description) {
      const newEarnings = [
        ...earnings,
        { value: parseFloat(value), description },
      ];
      setEarnings(newEarnings);
      setValue("");
      setDescription("");
    } else {
      setErrorMessage("Preencha ambos os campos!");
    }
  };

  const deleteEarning = (index: number) => {
    const updatedEarnings = earnings.filter((_, i) => i !== index);
    setEarnings(updatedEarnings);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={styles.earningsSection}>
      <h1>Gerenciar Ganhos</h1>
      <div>
        <Input
          type="number"
          placeholder="Valor do ganho"
          value={value}
          maxLength={10}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição"
          maxLength={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <Button label="Adicionar" onClick={addEarning} />
      </div>
      <ul>
        {earnings.map((earning, index) => (
          <li key={index}>
            <span>
              R$ {earning.value.toFixed(2)} - {earning.description}
            </span>
            <Button label="Excluir" onClick={() => deleteEarning(index)} />
          </li>
        ))}
      </ul>
    </MotionDiv>
  );
};

export default Earnings;
