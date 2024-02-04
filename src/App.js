import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FactorMe from "./pages/FactorMe";
import Onetris from "./pages/Onetris";
import Clock from "./pages/Clock";
import Counter from "./pages/Counter";

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
        <Route path="/clock" element={<Layout />}>
          <Route index element={<Clock />} />
        </Route>
        <Route path="/counter" element={<Layout />}>
          <Route index element={<Counter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);