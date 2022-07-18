import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import PoolNav from "./components/PoolNav";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pool" element={<PoolNav />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
