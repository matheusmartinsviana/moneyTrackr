import React, { useEffect, useState } from "react";
import Select from "../shared/components/Select";
import Button from "../shared/components/Button";
import ReusableInput from "../shared/components/Input";
import styles from "./styles/FinancesManagement.module.css";

// Helper Types
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

const FinancesManagement: React.FC = () => {
  const [people, setPeople] = useState<Person[]>(() => {
    const savedPeople = localStorage.getItem("people");
    return savedPeople ? JSON.parse(savedPeople) : [];
  });
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const savedAccounts = localStorage.getItem("accounts");
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  const [accountTypes, setAccountTypes] = useState<string[]>(() => {
    const savedTypes = localStorage.getItem("accountTypes");
    return savedTypes ? JSON.parse(savedTypes) : [];
  });

  const [isActiveAddPerson, setIsActiveAddPerson] = useState(false);
  const [isActiveAddAccountType, setIsActiveAddAccountType] = useState(false);
  const [personName, setPersonName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountValue, setAccountValue] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<number | "">("");

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("accountTypes", JSON.stringify(accountTypes));
  }, [accountTypes]);

  const addPerson = () => {
    if (personName.trim()) {
      setPeople([...people, { id: Date.now(), name: personName.trim() }]);
      setPersonName("");
      setIsActiveAddPerson(false);
    }
  };

  const addAccount = () => {
    if (
      accountName.trim() &&
      accountType.trim() &&
      selectedPerson &&
      parseFloat(accountValue) > 0
    ) {
      setAccounts([
        ...accounts,
        {
          id: Date.now(),
          name: accountName.trim(),
          type: accountType.trim(),
          value: parseFloat(accountValue),
          personId: selectedPerson,
        },
      ]);

      setAccountName("");
      setAccountType("");
      setAccountValue("");
      setSelectedPerson("");
    }
  };

  const addAccountType = (type: string) => {
    if (type.trim() && !accountTypes.includes(type.trim())) {
      const updatedTypes = [...accountTypes, type.trim()];
      setAccountTypes(updatedTypes);
      localStorage.setItem("accountTypes", JSON.stringify(updatedTypes));
    }
    setIsActiveAddAccountType(false);
  };

  const removeAccountType = (type: string) => {
    const updatedTypes = accountTypes.filter((t) => t !== type);
    setAccountTypes(updatedTypes);
    localStorage.setItem("accountTypes", JSON.stringify(updatedTypes));
  };

  // const updateAccount = (id: number, field: keyof Account, value: number) => {
  //   setAccounts((prev) =>
  //     prev.map((account) =>
  //       account.id === id ? { ...account, [field]: value } : account
  //     )
  //   );
  // };

  const deleteAccount = (id: number) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const getTotalByPerson = (personId: number): number => {
    return accounts
      .filter((account) => account.personId === personId)
      .reduce((total, account) => total + account.value, 0);
  };

  return (
    <div className={styles.mainFinancesContent}>
      <section className={styles.addPersonSection}>
        {isActiveAddPerson ? (
          <>
            <h2>Adicionar Nova Pessoa</h2>
            <ReusableInput
              label="Nome da Pessoa"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Digite o nome da pessoa"
            />
            <Button label="Adicionar Pessoa" onClick={addPerson} />
          </>
        ) : (
          <Button
            label="Adicionar Pessoa"
            onClick={() => setIsActiveAddPerson(!isActiveAddPerson)}
          />
        )}
      </section>

      <section className={styles.addAccountSection}>
        <h2>Adicionar Conta</h2>
        <Select
          options={people.map((person) => ({
            value: person.id,
            label: person.name,
          }))}
          onChange={(value) => setSelectedPerson(Number(value))}
          placeholder="Selecionar Pessoa"
        />
        <ReusableInput
          label="Nome da Conta"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Digite o nome da conta"
        />
        <Select
          options={accountTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          onChange={(value) => setAccountType(String(value))}
          placeholder="Selecionar Tipo de Conta"
        />
        {isActiveAddAccountType ? (
          <ReusableInput
            label="Novo Tipo de Conta"
            placeholder="Digite o novo tipo e pressione Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addAccountType(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        ) : (
          <Button
            label="Adicionar Tipo de Conta"
            onClick={() => setIsActiveAddAccountType(!isActiveAddAccountType)}
          />
        )}

        <ReusableInput
          label="Valor da Conta"
          type="number"
          value={accountValue}
          onChange={(e) => setAccountValue(e.target.value)}
          placeholder="Digite o valor da conta"
        />
        <Button label="Adicionar Conta" onClick={addAccount} />
      </section>

      <section className={styles.accountTypesSection}>
        <h2>Tipos de Conta</h2>
        {accountTypes.map((type, index) => (
          <div key={index} className={styles.accountTypeItem}>
            <span>{type}</span>
            <Button label="Remover" onClick={() => removeAccountType(type)} />
          </div>
        ))}
      </section>

      <section className={styles.accountsByPersonSection}>
        <h2>Contas por Pessoa</h2>
        {people.map((person) => {
          const personAccounts = accounts.filter(
            (account) => account.personId === person.id
          );

          return (
            <div key={person.id} className={styles.personAccounts}>
              <h3>{person.name}</h3>

              {personAccounts.length === 0 ? (
                <p>Não há contas ainda</p> // Show this message if no accounts exist for the person
              ) : (
                <div className={styles.customTable}>
                  <div className={styles.customTableHeader}>Conta</div>
                  <div className={styles.customTableHeader}>Tipo da Conta</div>
                  <div className={styles.customTableHeader}>Valor</div>
                  <div className={styles.customTableHeader}>Ações</div>

                  {personAccounts.map((account) => (
                    <React.Fragment key={account.id}>
                      <div className={styles.customTableCell}>
                        {account.name}
                      </div>
                      <div className={styles.customTableCell}>
                        {account.type}
                      </div>
                      <div className={styles.customTableCell}>
                        {account.value.toFixed(2)}
                      </div>
                      <div className={styles.customTableCell}>
                        <button
                          className={styles.deleteRowButton}
                          onClick={() => deleteAccount(account.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              <div>
                <strong>Total:</strong> R${" "}
                {getTotalByPerson(person.id).toFixed(2)}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default FinancesManagement;
