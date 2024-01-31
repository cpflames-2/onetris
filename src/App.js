import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FactorMe from "./pages/FactorMe";
import Onetris from "./pages/Onetris";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/factorme" element={<Layout />}>
          <Route index element={<FactorMe />} />
        </Route>
        <Route path="/onetris" element={<Layout />}>
          <Route index element={<Onetris />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);