import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/factorme?number=42">FactorMe</Link></li>
          <li><Link to="/onetris">Onetris</Link></li>
          <li><Link to="/clock">Clock</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>
      </nav>
      <div class="mainbody">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;