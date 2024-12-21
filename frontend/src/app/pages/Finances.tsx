import React, { useEffect, useState } from "react";

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

const Finances: React.FC = () => {
    const [people, setPeople] = useState<Person[]>(() => {
        const savedPeople = localStorage.getItem("people");
        return savedPeople ? JSON.parse(savedPeople) : [];
    });
    const [accounts, setAccounts] = useState<Account[]>(() => {
        const savedAccounts = localStorage.getItem("accounts");
        return savedAccounts ? JSON.parse(savedAccounts) : [];
    });
    const [personName, setPersonName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountValue, setAccountValue] = useState<number>(0);
    const [selectedPerson, setSelectedPerson] = useState<number | "">("");

    useEffect(() => {
        localStorage.setItem("people", JSON.stringify(people));
    }, [people]);

    useEffect(() => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }, [accounts]);

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
            <div>
                <h2>Adicione uma nova pessoa</h2>
                <input
                    type="text"
                    placeholder="Nome da Pessoa"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                />
                <button onClick={addPerson}>Adicionar pessoa</button>
            </div>
            <div>
                <h2>Adicionar conta</h2>
                <select
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(Number(e.target.value))}
                >
                    <option value="">Selecionar pessoa</option>
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
                <input
                    type="number"
                    placeholder="Valor da conta"
                    value={accountValue}
                    onChange={(e) => setAccountValue(Number(e.target.value))}
                />
                <button onClick={addAccount}>Adicionar Conta</button>
            </div>

            <div>
                <h2>Contas por Pessoa</h2>
                {people.map((person) => (
                    <div
                        key={person.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        <h3>{person.name}</h3>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginBottom: "10px",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        Conta
                                    </th>
                                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts
                                    .filter((account) => account.personId === person.id)
                                    .map((account) => (
                                        <tr key={account.id}>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                {account.name}
                                            </td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                R$ {account.value.toFixed(2)}
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

export default Finances;
