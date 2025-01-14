/* eslint-disable */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import ReusableInput from "./Input";
import Select from "./Select";
import styles from "./styles/AccountsForm.module.css";

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

const AccountsForm: React.FC = () => {
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
  const [newAccountType, setNewAccountType] = useState<string>("");

  const [errorPersonName, setErrorPersonName] = useState<string>("");
  const [errorAccountName, setErrorAccountName] = useState<string>("");
  const [errorAccountType, setErrorAccountType] = useState<string>("");
  const [errorAccountValue, setErrorAccountValue] = useState<string>("");
  const [errorSelectedPerson, setErrorSelectedPerson] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("accountTypes", JSON.stringify(accountTypes));
  }, [accountTypes]);

  const showErrorTemporarily = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    message: string
  ) => {
    setter(message);
    setTimeout(() => setter(""), 10000);
  };

  const validatePersonName = () => {
    if (!personName.trim()) {
      showErrorTemporarily(
        setErrorPersonName,
        "O nome da pessoa não pode estar vazio."
      );
      return false;
    }
    setErrorPersonName("");
    return true;
  };

  const validateAccountFields = () => {
    let valid = true;

    if (!accountName.trim()) {
      showErrorTemporarily(
        setErrorAccountName,
        "O nome da conta não pode estar vazio."
      );
      valid = false;
    }

    if (!accountType.trim()) {
      showErrorTemporarily(setErrorAccountType, "Selecione um tipo de conta.");
      valid = false;
    }

    if (!selectedPerson) {
      showErrorTemporarily(setErrorSelectedPerson, "Selecione uma pessoa.");
      valid = false;
    }

    if (!accountValue || parseFloat(accountValue) <= 0) {
      showErrorTemporarily(
        setErrorAccountValue,
        "O valor da conta deve ser maior que zero."
      );
      valid = false;
    }

    return valid;
  };

  const addPerson = () => {
    if (validatePersonName()) {
      setPeople([...people, { id: Date.now(), name: personName.trim() }]);
      setPersonName("");
      setIsActiveAddPerson(false);
    }
  };

  const addAccount = () => {
    if (validateAccountFields()) {
      setAccounts([
        //@ts-ignore
        ...accounts,
        {
          id: Date.now(),
          name: accountName.trim(),
          type: accountType.trim(),
          value: parseFloat(accountValue),
          //@ts-ignore
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
    } else {
      showErrorTemporarily(
        setErrorAccountType,
        "Tipo de conta inválido ou já existente."
      );
    }
    setIsActiveAddAccountType(false);
  };

  const removeAccountType = (type: string) => {
    const updatedTypes = accountTypes.filter((t) => t !== type);
    setAccountTypes(updatedTypes);
    localStorage.setItem("accountTypes", JSON.stringify(updatedTypes));
  };

  const removePerson = (id: number) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    localStorage.setItem("people", JSON.stringify(updatedPeople));
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainFinancesContent}>
        <section className={styles.addPersonSection}>
          <h2>Pessoas/Responsáveis</h2>
          <div className={styles.accountTypeSectionContent}>
            {people.length === 0 ? (
              <p>Você ainda não registrou nenhuma pessoa</p>
            ) : (
              people.map((person) => (
                <div key={person.id} className={styles.accountTypeItem}>
                  <span className={styles.spanAccountType}>
                    {person.name}
                    <button
                      className={styles.xButtonAccountType}
                      title="Remover"
                      onClick={() => removePerson(person.id)}
                    >
                      <IoMdClose />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
          {isActiveAddPerson ? (
            <>
              <ReusableInput
                label="Nome da Pessoa"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Digite o nome da pessoa"
              />
              {errorPersonName && (
                <p className={styles.errorMessage}>{errorPersonName}</p>
              )}
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
            options={
              people.length === 0
                ? [{ value: "", label: "Não há pessoas disponíveis" }]
                : people.map((person) => ({
                    value: person.id,
                    label: person.name,
                  }))
            }
            onChange={(value) => setSelectedPerson(Number(value))}
            placeholder="Selecionar Pessoa"
          />
          {errorSelectedPerson && (
            <p className={styles.errorMessage}>{errorSelectedPerson}</p>
          )}
          <ReusableInput
            label="Nome da Conta"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Digite o nome da conta"
          />
          {errorAccountName && (
            <p className={styles.errorMessage}>{errorAccountName}</p>
          )}
          <Select
            options={
              accountTypes.length === 0
                ? [{ value: "", label: "Não há tipos de conta disponíveis" }]
                : accountTypes.map((type) => ({
                    value: type,
                    label: type,
                  }))
            }
            onChange={(value) => setAccountType(String(value))}
            placeholder="Selecionar Tipo de Conta"
          />
          {errorAccountType && (
            <p className={styles.errorMessage}>{errorAccountType}</p>
          )}
          <ReusableInput
            label="Valor da Conta"
            type="number"
            value={accountValue}
            onChange={(e) => setAccountValue(e.target.value)}
            placeholder="Digite o valor da conta"
          />
          {errorAccountValue && (
            <p className={styles.errorMessage}>{errorAccountValue}</p>
          )}
          <Button label="Adicionar Conta" onClick={addAccount} />
        </section>
        <section className={styles.accountTypesSection}>
          <div className={styles.headerAccountTypesSection}>
            <h2>Tipos de Conta</h2>
          </div>
          <div className={styles.accountTypeSectionContent}>
            {accountTypes.length === 0 ? (
              <p>Não há tipos de conta criados</p>
            ) : (
              accountTypes.map((type, index) => (
                <div key={index} className={styles.accountTypeItem}>
                  <span className={styles.spanAccountType}>
                    {type}
                    <button
                      className={styles.xButtonAccountType}
                      title="Remover"
                      onClick={() => removeAccountType(type)}
                    >
                      <IoMdClose />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
          {isActiveAddAccountType ? (
            <>
              <ReusableInput
                label="Novo Tipo de Conta"
                placeholder="Digite o novo tipo e pressione Enter"
                onChange={(e) => setNewAccountType(e.target.value)}
              />
              <Button
                label="Adicionar Tipo de Conta"
                onClick={() => addAccountType(newAccountType)}
              />
            </>
          ) : (
            <Button
              label="Adicionar Tipo de Conta"
              onClick={() => setIsActiveAddAccountType(!isActiveAddAccountType)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountsForm;
