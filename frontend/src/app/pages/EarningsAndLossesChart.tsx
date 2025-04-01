import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Account {
  id: number;
  name: string;
  type: string;
  value: number;
  personId: number;
}

const EarningsLossesChart: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [earnings, setEarnings] = useState<Account[]>([]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
    const storedEarnings = localStorage.getItem("earnings");
    if (storedEarnings) {
      setEarnings(JSON.parse(storedEarnings));
    }
  }, []);

  const calculateData = () => {
    const totalGains = earnings.reduce((sum, earning) => sum + earning.value, 0);
    const totalLosses = accounts.reduce(
      (sum, account) => sum + Math.abs(account.value),
      0
    );

    return {
      labels: ["Ganhos", "Perdas"],
      datasets: [
        {
          data: [totalGains, totalLosses],
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `R$ ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Gráfico de Ganhos e Perdas</h1>
      {accounts.length > 0 || earnings.length > 0 ? (
        <Doughnut data={calculateData()} options={options} />
      ) : (
        <p>Ainda não há dados para carregar o gráfico...</p>
      )}
    </div>
  );
};

export default EarningsLossesChart;
