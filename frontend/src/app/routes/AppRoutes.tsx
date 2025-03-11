/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "../pages/Error404";
import FinancesDashboard from "../pages/FinancesDashboard";
import { Body } from "../shared/components/Body";
import FinancesManagement from "../pages/FinancesManagement";
// const Home = lazy(() => import("../pages/Home")); //lazy permite carregar componentes sob demanda

// Simulando um atraso na importação do componente para forçar o loading
const Home = lazy(
  () =>
    new Promise((resolve) =>
      //@ts-ignore
      setTimeout(() => resolve(import("../pages/Home")), 2000)
    )
);

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Home />} />
          <Route path="/gerenciar-financias" element={<FinancesManagement />} />
          <Route path="/dashboard" element={<FinancesDashboard />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
