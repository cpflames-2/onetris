import { Outlet } from "react-router-dom";
import './Layout.css';

const ChessOnlyLayout = () => {
  return (
    <>
      <div class="mainbody">
        <Outlet />
      </div>
    </>
  )
};

export default ChessOnlyLayout;