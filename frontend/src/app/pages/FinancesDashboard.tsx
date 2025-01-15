import React, { useEffect, useState, useCallback } from "react";
import PersonSpendingChart from "./PersonSpendingChart";
import TotalSpendingChart from "./TotalSpendingChart";
import styles from "./styles/FinancesDashboard.module.css";
import EarningsLossesChart from "./EarningsAndLossesChart";

interface Person {
  id: number;
  name: string;
}

interface Account {
  id: number;
  name: string;
  type: string;
  value: number;
  personId: number;
}

const FinancesDashboard: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountTypes, setAccountTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadDataFromLocalStorage = useCallback(() => {
    try {
      const storedPeople = localStorage.getItem("people");
      const storedAccounts = localStorage.getItem("accounts");
      const storedAccountTypes = localStorage.getItem("accountTypes");

      if (storedPeople && storedAccounts && storedAccountTypes) {
        setPeople(JSON.parse(storedPeople));
        setAccounts(JSON.parse(storedAccounts));
        setAccountTypes(JSON.parse(storedAccountTypes));
      } else {
        setError("Dados não encontrados no localStorage.");
      }
    } catch (err) {
      console.error("Erro ao carregar dados do localStorage:", err);
      setError("Ocorreu um erro ao carregar os dados. Tente novamente.");
    }
  }, []);

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [loadDataFromLocalStorage]);

  const hasData =
    people.length > 0 && accounts.length > 0 && accountTypes.length > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dashboard de Finanças</h1>
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : hasData ? (
        <div className={styles.chartContainer}>
          <PersonSpendingChart
            people={people}
            accounts={accounts}
            accountTypes={accountTypes}
          />
          <TotalSpendingChart accounts={accounts} accountTypes={accountTypes} />
          <EarningsLossesChart />
        </div>
      ) : (
        <p className={styles.loadingText}>Carregando dados...</p>
      )}
    </div>
  );
};

export default FinancesDashboard;
