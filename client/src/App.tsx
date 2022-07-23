import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Caver from "caver-js";
import Main from "./main/Main";
import AprNav from "./pool/apr/AprNav";
import AprMain from "./pool/apr/AprMain";
import TvlMain from "./pool/tvl/TvlMain";
import ProjectTvlMain from "./pool/project/ProjectTvlMain";

function App() {
  const [account, setAccount] = useState<string>("");

  const Connect = async () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
    }

    try {
      const accounts = await window.klaytn.enable();
      const account = window.klaytn.selectedAddress;
      setAccount(accounts);
      const caver = new Caver(window.klaytn);
      const balance = await caver.klay.getBalance(account);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/apr"
            element={<AprMain account={account} Connect={Connect} />}
          />
          <Route
            path="/tvl"
            element={<TvlMain account={account} Connect={Connect} />}
          />
          <Route
            path="/project"
            element={<ProjectTvlMain account={account} Connect={Connect} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
