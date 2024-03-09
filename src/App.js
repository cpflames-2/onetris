import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ChessOnlyLayout from "./pages/ChessOnlyLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import FactorMe from "./pages/FactorMe";
import Onetris from "./pages/Onetris";
import Clock from "./pages/Clock";
import Counter from "./pages/Counter";
import Resizer from "./pages/Resizer";
import RowEffect from "./pages/RowEffect";
import CellEffect from "./pages/CellEffect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChessOnlyLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/projects" element={<Layout />}>
          <Route index element={<Projects />} />
        </Route>
        <Route path="/factorme" element={<Layout />}>
          <Route index element={<FactorMe />} />
        </Route>
        <Route path="/onetris" element={<Layout />}>
          <Route index element={<Onetris />} />
        </Route>
        <Route path="/clock" element={<Layout />}>
          <Route index element={<Clock />} />
        </Route>
        <Route path="/counter" element={<Layout />}>
          <Route index element={<Counter />} />
        </Route>
        <Route path="/resizer" element={<Layout />}>
          <Route index element={<Resizer />} />
        </Route>
        <Route path="/roweffect" element={<Layout />}>
          <Route index element={<RowEffect />} />
        </Route>
        <Route path="/celleffect" element={<Layout />}>
          <Route index element={<CellEffect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);