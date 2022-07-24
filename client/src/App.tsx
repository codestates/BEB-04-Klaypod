import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Caver from "caver-js";
import Main from "./main/Main";
import AprMain from "./pool/apr/AprMain";
import TvlMain from "./pool/tvl/TvlMain";
import ProjectTvlMain from "./pool/project/ProjectTvlMain";
import Wallet from "./wallet/Wallet";
import swal from "sweetalert";

function App() {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const Connect = async () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
    }

    try {
      const accounts = await window.klaytn.enable();
      const accountAddress = window.klaytn.selectedAddress;
      setAccount(accounts);
      const caver = new Caver(window.klaytn);
      const accountBalance = await caver.klay.getBalance(accountAddress);
      setBalance(accountBalance);
    } catch (error) {
      console.error(error);
    }
    swal({
      text: "Kaikas 지갑 연결 완료!",
      icon: "success",
    });
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
          <Route
            path="/wallet"
            element={
              <Wallet account={account} Connect={Connect} balance={balance} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
