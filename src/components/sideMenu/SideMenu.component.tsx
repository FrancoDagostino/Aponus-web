import { Link, NavLink } from "react-router-dom";
import "./style/sideMenuStyle.css";
const SideMenuComponent = () => {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <NavLink
          to="/product-list"
          style={({ isActive }) =>
            isActive ? { fontWeight: "bold", color: "red" } : {}
          }
        >
          Listado de Productos
        </NavLink>
        <NavLink
          to="/stock-list"
          style={({ isActive }) =>
            isActive ? { fontWeight: "bold", color: "red" } : {}
          }
        >
          Listado de Stock
        </NavLink>
        <NavLink
          to="/category-list"
          style={({ isActive }) =>
            isActive ? { fontWeight: "bold", color: "red" } : {}
          }
        >
          Categorias
        </NavLink>
        <a href="#referral">Referral</a>
        <a href="#subaccounts">Sub Accounts</a>
        <a href="#settings">Settings</a>
      </div>
    </div>
  );
};

export default SideMenuComponent;
