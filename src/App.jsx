import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./components/routes/Routers";

function App() {
  return (
    <>
      <Router>
        <Routers />
      </Router>
    </>
  );
}

export default App;
