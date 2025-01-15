/* eslint-disable */
import React, { useEffect, useState } from "react";
import styles from "./styles/GeneralTable.module.css";
import Input from "./Input";
import Button from "./Button";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsTrash3 } from "react-icons/bs";

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

const GeneralTable: React.FC = () => {
  // @ts-ignore
  const [people, setPeople] = useState<Person[]>(() => {
    const savedPeople = localStorage.getItem("people");
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    const savedAccounts = localStorage.getItem("accounts");
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });

  // @ts-ignore
  const [accountTypes, setAccountTypes] = useState<string[]>(() => {
    const savedTypes = localStorage.getItem("accountTypes");
    return savedTypes ? JSON.parse(savedTypes) : [];
  });

  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("accountTypes", JSON.stringify(accountTypes));
  }, [accountTypes]);

  const getAccountsByPerson = (personId: number) => {
    return accounts.filter((account) => account.personId === personId);
  };

  const saveEditedAccount = () => {
    if (editingAccount) {
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === editingAccount.id ? editingAccount : account
        )
      );
      setEditingAccount(null);
    }
  };

  const cancelEdit = () => {
    setEditingAccount(null);
  };

  const deleteAccount = (accountId: number) => {
    setAccounts((prev) => prev.filter((account) => account.id !== accountId));
  };

  const startEditingAccount = (account: Account) => {
    setEditingAccount({ ...account });
  };

  return (
    <div className={styles.generalTableContainer}>
      <h2>Contas por Pessoa</h2>
      {people.map((person) => {
        const personAccounts = getAccountsByPerson(person.id);

        return (
          <div key={person.id} className={styles.personAccounts}>
            <h3>{person.name}</h3>

            {personAccounts.length === 0 ? (
              <p>Não há contas ainda</p>
            ) : (
              <div className={styles.customTable}>
                <div className={styles.customTableHeader}>Conta</div>
                <div className={styles.customTableHeader}>Tipo da Conta</div>
                <div className={styles.customTableHeader}>Valor</div>
                <div className={styles.customTableHeader}>Ações</div>

                {personAccounts.map((account) => (
                  <div key={account.id} className={styles.customTableRow}>
                    <div className={styles.customTableCell}>
                      {editingAccount?.id === account.id ? (
                        <Input
                          value={editingAccount.name}
                          onChange={(e) =>
                            setEditingAccount((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                        />
                      ) : (
                        account.name
                      )}
                    </div>

                    <div className={styles.customTableCell}>
                      {editingAccount?.id === account.id ? (
                        <Input
                          value={editingAccount.type}
                          onChange={(e) =>
                            setEditingAccount((prev) =>
                              prev ? { ...prev, type: e.target.value } : null
                            )
                          }
                        />
                      ) : (
                        account.type
                      )}
                    </div>

                    <div className={styles.customTableCell}>
                      {editingAccount?.id === account.id ? (
                        <Input
                          value={String(editingAccount.value)}
                          type="number"
                          onChange={(e) =>
                            setEditingAccount((prev) =>
                              prev
                                ? { ...prev, value: parseFloat(e.target.value) }
                                : null
                            )
                          }
                        />
                      ) : (
                        account.value.toFixed(2)
                      )}
                    </div>

                    <div className={styles.customTableCell}>
                      {editingAccount?.id === account.id ? (
                        <div className={styles.confirmationActions}>
                          <Button label="Salvar" onClick={saveEditedAccount} />
                          <Button label="Cancelar" onClick={cancelEdit} />
                        </div>
                      ) : (
                        <>
                          <button
                            className={styles.deleteRowButton}
                            onClick={() => deleteAccount(account.id)}
                          >
                            <BsTrash3 />
                          </button>
                          <button
                            className={styles.editRowButton}
                            onClick={() => startEditingAccount(account)}
                          >
                            <HiOutlinePencilSquare />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GeneralTable;
