/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";

type Person = {
  id: number;
  name: string;
};

type Account = {
  id: number;
  name: string;
  type: string;
  value: number;
  personId: number;
};

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
        <input
          type="text"
          placeholder="Nome da Pessoa"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <button onClick={addPerson}>Adicionar Pessoa</button>
      </div>

      <div>
        <h2>Adicionar Conta</h2>
        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(Number(e.target.value) || "")}
        >
          <option value="">Selecionar Pessoa</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nome da Conta"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="">Selecionar Tipo de Conta</option>
          {accountTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Novo Tipo de Conta"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addAccountType(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
        <input
          type="number"
          placeholder="Valor da Conta"
          value={accountValue}
          onChange={(e) => setAccountValue(e.target.value)}
        />
        <button onClick={addAccount}>Adicionar Conta</button>
      </div>

      <div>
        <h2>Tipos de Conta</h2>
        {accountTypes.map((type, index) => (
          <div key={index}>
            <span>{type}</span>
            <button onClick={() => removeAccountType(type)}>Remover</button>
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
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAccount(
                            account.id,
                            "name",
                            // @ts-expect-error
                            e.target.textContent || ""
                          )
                        }
                      >
                        {account.name}
                      </td>
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAccount(
                            account.id,
                            "type",
                            // @ts-expect-error
                            e.target.textContent || ""
                          )
                        }
                      >
                        {account.type}
                      </td>
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAccount(
                            account.id,
                            "value",
                            parseFloat(e.target.textContent || "0") || 0
                          )
                        }
                      >
                        {account.value.toFixed(2)}
                      </td>
                      <td>
                        <button onClick={() => deleteAccount(account.id)}>
                          🗑️
                        </button>
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
