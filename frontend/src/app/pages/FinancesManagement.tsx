import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import Earnings from "../shared/components/Eanings";
import AccountsForm from "../shared/components/AccountsForm";
import styles from "./styles/FinancesManagement.module.css";

const FinancesManagement: React.FC = () => {
  const [alignment, setAlignment] = React.useState("accounts");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <section className={styles.toggleButtonSection}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="accounts" disabled={alignment === "accounts"}>
          Contas
        </ToggleButton>
        <ToggleButton value="earnings" disabled={alignment === "earnings"}>
          Ganhos
        </ToggleButton>
      </ToggleButtonGroup>

      <div style={{ marginTop: "20px" }}>
        {alignment === "accounts" && <AccountsForm />}
        {alignment === "earnings" && <Earnings />}
      </div>
    </section>
  );
};

export default FinancesManagement;
