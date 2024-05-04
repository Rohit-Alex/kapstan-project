import { Route, Routes } from "react-router-dom";
import "./global.scss";
import Layout from "./Layout";
import Dashboard from "components/Dashboard";
import DashboardTabProvider from "Context/tabSelected";
function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardTabProvider>
              <Dashboard />
            </DashboardTabProvider>
          }
        />
        <Route path="*" element={<h4>Page not found</h4>} />
      </Routes>
    </Layout>
  );
}

export default App;
