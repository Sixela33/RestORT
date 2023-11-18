import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  BarsOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  FileAddOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useApi } from "../Context/APIContext";

const MenuList = () => {
  const { logout } = useApi();
  return (
    <Menu theme="dark" mode="inline" className="menu-bar">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to={`/`}>Home</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to={`/login`}>Login</Link>
      </Menu.Item>
      <Menu.Item key="registrarse" icon={<UsergroupAddOutlined />}>
        <Link to={`/signin`}>Sign in</Link>
      </Menu.Item>
      <Menu.SubMenu
        key="crudingredientes"
        icon={<BarsOutlined />}
        title="Ingredientes"
      >
        <Menu.Item key="verIngrediente" icon={<ReadOutlined />}>
          <Link to={`/ingredientes`}>Ver</Link>
        </Menu.Item>
        <Menu.Item key="agregarIngrediente" icon={<FileAddOutlined />}>
          <Link to={`/agregarIngrediente`}>Agregar</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout()}>
        <Link to={`/logout`}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
