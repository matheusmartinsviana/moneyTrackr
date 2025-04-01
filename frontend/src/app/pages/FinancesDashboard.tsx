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

interface Earnings {
  date: string;
  value: number;
}

const FinancesDashboard: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountTypes, setAccountTypes] = useState<string[]>([]);
  const [earnings, setEarnings] = useState<Earnings[]>([]); // Dados de ganhos
  const [error, setError] = useState<string | null>(null);

  const loadDataFromLocalStorage = useCallback(() => {
    try {
      const storedPeople = localStorage.getItem("people");
      const storedAccounts = localStorage.getItem("accounts");
      const storedAccountTypes = localStorage.getItem("accountTypes");
      const storedEarnings = localStorage.getItem("earnings");

      if (storedPeople && storedAccounts && storedAccountTypes && storedEarnings) {
        setPeople(JSON.parse(storedPeople));
        setAccounts(JSON.parse(storedAccounts));
        setAccountTypes(JSON.parse(storedAccountTypes));
        setEarnings(JSON.parse(storedEarnings)); // Carregar ganhos
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
    people.length > 0 &&
    accounts.length > 0 &&
    accountTypes.length > 0 &&
    earnings.length > 0;

  const accountSummary = accounts.reduce((summary: any, account) => {
    const type = account.type;
    if (!summary[type]) {
      summary[type] = { count: 0, total: 0 };
    }
    summary[type].count += 1;
    summary[type].total += account.value;
    return summary;
  }, {});

  const totalEarnings = earnings.reduce((total, earning) => total + earning.value, 0);
  const totalSpending = accounts.reduce((total, account) => total + account.value, 0);

  const spendingAlert = totalSpending > totalEarnings ? "Alerta: Você está gastando mais do que está ganhando!" : "";

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
          <EarningsLossesChart earnings={earnings} />
          <div className="{styles.accountResults}>">
            <h2>Relação entre saídas e entradas de dinheiro:</h2>
            <div>
              <p>Entradas: {totalEarnings}</p>
              <p>Saídas: {totalSpending}</p>
              <p>Saldo: {totalEarnings - totalSpending}</p>
            </div>
          </div>

          {/* Resumo das Contas por Tipo */}
          <div className={styles.accountSummary}>
            <h3>Resumo das Contas</h3>
            {Object.keys(accountSummary).map((type) => (
              <div key={type}>
                <p>
                  Tipo {type}: {accountSummary[type].count} {accountSummary[type].count > 1 ? "contas" : "conta"} - Total: {accountSummary[type].total}
                </p>
              </div>
            ))}
          </div>

          {spendingAlert && <div className={styles.spendingAlert}>{spendingAlert}</div>}

          <div className={styles.totalEarnings}>
            <h3>Total de Ganhos</h3>
            <p>{totalEarnings.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          </div>

          <div className={styles.totalSpending}>
            <h3>Total de Gastos</h3>
            <p>{totalSpending.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          </div>

        </div>
      ) : (
        <p className={styles.loadingText}>Ainda não há dados para mostrar... Registre contas e ganhos para o dashboard aparecer</p>
      )}
    </div>
  );
};

export default FinancesDashboard;