import React, { useEffect, useState } from "react";
import Select from "../shared/components/Select";
import Button from "../shared/components/Button";
import ReusableInput from "../shared/components/Input";

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
  };

  const removeAccountType = (type: string) => {
    const updatedTypes = accountTypes.filter((t) => t !== type);
    setAccountTypes(updatedTypes);
    localStorage.setItem("accountTypes", JSON.stringify(updatedTypes));
  };

  const updateAccount = (id: number, field: keyof Account, value: number) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const deleteAccount = (id: number) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const getTotalByPerson = (personId: number): number => {
    return accounts
      .filter((account) => account.personId === personId)
      .reduce((total, account) => total + account.value, 0);
  };

  return (
    <div>
      <div>
        <h2>Adicionar Nova Pessoa</h2>
        <ReusableInput
          label="Nome da Pessoa"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Digite o nome da pessoa"
        />
        <Button label="Adicionar Pessoa" onClick={addPerson} />
      </div>

      <div>
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
        <ReusableInput
          label="Valor da Conta"
          type="number"
          value={accountValue}
          onChange={(e) => setAccountValue(e.target.value)}
          placeholder="Digite o valor da conta"
        />
        <Button label="Adicionar Conta" onClick={addAccount} />
      </div>

      <div>
        <h2>Tipos de Conta</h2>
        {accountTypes.map((type, index) => (
          <div key={index}>
            <span>{type}</span>
            <Button label="Remover" onClick={() => removeAccountType(type)} />
          </div>
        ))}
      </div>

      <div>
        <h2>Contas por Pessoa</h2>
        {people.map((person) => (
          <div key={person.id}>
            <h3>{person.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Conta</th>
                  <th>Tipo da Conta</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {accounts
                  .filter((account) => account.personId === person.id)
                  .map((account) => (
                    <tr key={account.id}>
                      <td>{account.name}</td>
                      <td>{account.type}</td>
                      <td>{account.value.toFixed(2)}</td>
                      <td>
                        <Button
                          label="🗑️"
                          onClick={() => deleteAccount(account.id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              <strong>Total:</strong> R${" "}
              {getTotalByPerson(person.id).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancesManagement;
