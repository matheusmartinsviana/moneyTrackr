import React, { useState } from "react";

type Person = {
  id: number;
  name: string;
};

type Account = {
  id: number;
  name: string;
  value: number;
  personId: number;
};

const Home: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [personName, setPersonName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountValue, setAccountValue] = useState<number>(0);
  const [selectedPerson, setSelectedPerson] = useState<number | "">("");

  const addPerson = () => {
    if (personName) {
      setPeople([...people, { id: Date.now(), name: personName }]);
      setPersonName("");
    }
  };

  const addAccount = () => {
    if (accountName && selectedPerson && accountValue > 0) {
      setAccounts([
        ...accounts,
        {
          id: Date.now(),
          name: accountName,
          value: accountValue,
          personId: selectedPerson,
        },
      ]);
      setAccountName("");
      setAccountValue(0);
      setSelectedPerson("");
    }
  };

  const getTotalByPerson = (personId: number): number => {
    return accounts
      .filter((account) => account.personId === personId)
      .reduce((total, account) => total + account.value, 0);
  };

  return (
    <div>
      <h1 title="Rastreie suas finanças, alcance seus objetivos.">
        Money Trackr
      </h1>
      <p>Rastreie suas finanças, alcance seus objetivos.</p>

      <div>
        <h2>Add Person</h2>
        <input
          type="text"
          placeholder="Person Name"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <button onClick={addPerson}>Add Person</button>
      </div>

      <div>
        <h2>Add Account</h2>
        <input
          type="text"
          placeholder="Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Account Value"
          value={accountValue}
          onChange={(e) => setAccountValue(Number(e.target.value))}
        />
        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(Number(e.target.value))}
        >
          <option value="">Select Person</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <button onClick={addAccount}>Add Account</button>
      </div>

      <div>
        <h2>Accounts</h2>
        {accounts.map((account) => {
          const person = people.find((p) => p.id === account.personId);
          return (
            <div key={account.id}>
              <strong>Account:</strong> {account.name} <br />
              <strong>Value:</strong> ${account.value.toFixed(2)} <br />
              <strong>Responsible:</strong>{" "}
              {person ? person.name : "Unassigned"}
            </div>
          );
        })}
      </div>

      <div>
        <h2>Total by Person</h2>
        {people.map((person) => (
          <div key={person.id}>
            <strong>{person.name}:</strong> $
            {getTotalByPerson(person.id).toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
