import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Login = lazy(() => import("./scene/Login"));

function App() {
  return (
    <Suspense>
      <Router>
        <Routes>
          <Route element={Login} path="/login" />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
