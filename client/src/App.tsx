import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
