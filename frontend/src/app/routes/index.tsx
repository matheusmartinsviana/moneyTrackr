import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
