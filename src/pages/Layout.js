import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <br/><br/>
        <span>Projects</span>
        <ul>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/factorme?number=42">FactorMe</Link></li>
          <li><Link to="/ratings?rating=1000">Ratings</Link></li>
          <li><Link to="/onetris">Onetris</Link></li>
        </ul>
        <span>Learn React</span>
        <ul>
          <li><Link to="/clock">Clock</Link></li>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/resizer">Resizer</Link></li>
          <li><Link to="/roweffect">RowEffect</Link></li>
          <li><Link to="/celleffect">CellEffect</Link></li>
        </ul>
      </nav>
      <div class="mainbody">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;