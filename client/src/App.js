import { createContext, useState } from "react";
import "./App.css";
import Routing from "./routing/Routing";

export const GlobalVariableContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div>
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <Routing></Routing>
      </GlobalVariableContext.Provider>
    </div>
  );
}

export default App;
