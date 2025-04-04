import React from "react";
import { Bar } from "react-chartjs-2";
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

interface PersonSpendingChartProps {
  people: Person[];
  accounts: Account[];
  accountTypes: string[];
}

const PersonSpendingChart: React.FC<PersonSpendingChartProps> = ({
  people,
  accounts,
  accountTypes,
}) => {
  const getPersonData = (personId: number): number[] => {
    const personAccounts = accounts.filter(
      (account) => account.personId === personId
    );
    return accountTypes.map((type) => {
      return personAccounts
        .filter((account) => account.type.toLowerCase() === type.toLowerCase())
        .reduce((total, account) => total + account.value, 0);
    });
  };

  const personData = {
    labels: people.map((person) => person.name),
    datasets: accountTypes.map((type, index) => ({
      label: type,
      data: people.map((person) => getPersonData(person.id)[index]),
      backgroundColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 30}, ${
        (index + 1) * 100
      }, 0.7)`,
      borderColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 30}, ${
        (index + 1) * 100
      }, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Gastos por Pessoa e Tipo de Conta",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Pessoa",
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

  return <Bar data={personData} options={options} />;
};

export default PersonSpendingChart;
