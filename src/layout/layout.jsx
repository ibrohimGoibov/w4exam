import { Link, Outlet } from "react-router-dom";
import '../App.css'
const Layout = () => {
  return (
    <div>
      <ul style={{ display: "flex", gap: "20px" }}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
      <div>
      </div>
        <Outlet />
    </div>
  );
};

export default Layout;
