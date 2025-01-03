import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalSpendingChart = ({ accounts, accountTypes }) => {
  const totalSpendingByType = accountTypes.map((type) => {
    return accounts
      .filter((account) => account.type.toLowerCase() === type.toLowerCase())
      .reduce((total, account) => total + account.value, 0);
  });

  const totalData = {
    labels: accountTypes,
    datasets: [
      {
        label: "Gastos Totais",
        data: totalSpendingByType,
        backgroundColor: accountTypes.map(
          (_, index) =>
            `rgba(${(index + 1) * 100}, ${(index + 1) * 50}, ${
              (index + 1) * 150
            }, 0.7)`
        ),
        borderColor: accountTypes.map(
          (_, index) =>
            `rgba(${(index + 1) * 100}, ${(index + 1) * 50}, ${
              (index + 1) * 150
            }, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Gastos Totais por Tipo de Conta",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tipo de Conta",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor (R$)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Chart type="bar" data={totalData} options={options} />;
};

export default TotalSpendingChart;
