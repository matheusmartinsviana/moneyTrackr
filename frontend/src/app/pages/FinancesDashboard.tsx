import React, { useEffect, useState } from "react";
import PersonSpendingChart from "./PersonSpendingChart";
import TotalSpendingChart from "./TotalSpendingChart";

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

  const loadDataFromLocalStorage = () => {
    const storedPeople = localStorage.getItem("people");
    const storedAccounts = localStorage.getItem("accounts");
    const storedAccountTypes = localStorage.getItem("accountTypes");

    if (storedPeople && storedAccounts && storedAccountTypes) {
      setPeople(JSON.parse(storedPeople));
      setAccounts(JSON.parse(storedAccounts));
      setAccountTypes(JSON.parse(storedAccountTypes));
    } else {
      console.log("Dados não encontrados no localStorage.");
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  return (
    <div>
      <h1>Dashboard de Finanças</h1>
      {people.length > 0 && accounts.length > 0 && accountTypes.length > 0 ? (
        <>
          <PersonSpendingChart
            people={people}
            accounts={accounts}
            accountTypes={accountTypes}
          />
          <TotalSpendingChart accounts={accounts} accountTypes={accountTypes} />
        </>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default FinancesDashboard;
