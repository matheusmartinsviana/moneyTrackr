import React, { Suspense } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import Loading from "./shared/components/Loading";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
