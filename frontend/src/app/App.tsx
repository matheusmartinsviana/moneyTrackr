import React, { Suspense } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import Loading from "./shared/components/Loading";
import ParticlesComponent from "./shared/components/ParticlesComponent";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ParticlesComponent id="particles" />
      <AppRoutes />
    </Suspense>
  );
};

export default App;
