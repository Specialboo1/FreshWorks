import React, { Suspense, lazy, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Spinner from "./common/CenteredSpinner";
import { AuthContext } from "./Authentication";

const Login = lazy(() => import("./scene/Login"));
const Card = lazy(() => import("./scene/Card"));

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Suspense fallback={<Spinner size={"100px"} />}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/card" /> : <Login />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/card" /> : <Login />}
          />
          <Route
            path="/card"
            element={!isAuthenticated ? <Navigate to="/login" /> : <Card />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
