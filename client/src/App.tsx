import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./main/Main";
import AprNav from "./pool/apr/AprNav";
import AprMain from "./pool/apr/AprMain";
import TvlMain from "./pool/tvl/TvlMain";
import ProjectTvlMain from "./pool/project/ProjectTvlMain";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/" element={<AprNav />} />
          <Route path="/pool" element={<AprMain />} />
          <Route path="/tvl" element={<TvlMain />} />
          <Route path="/project" element={<ProjectTvlMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
