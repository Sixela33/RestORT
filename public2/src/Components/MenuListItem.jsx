import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MenuListItem = () => {
  const navigate = useNavigate();
  const { logout, user } = useApi();
  const [items, setItems] = useState([]);
  // gracias al useNavigate se van a mapear lasrutas indicadas por la propiedad key de los items para navegar
  useEffect(() => {
    if (user) {
      setItems([
        { label: "Home", icon: <HomeOutlined />, key: "/" },
        {
          label: "Registrar Usuario",
          icon: <UsergroupAddOutlined />,
          key: "/signin",
        },
        {
          label: "Ingredientes",
          icon: <BarsOutlined />,
          children: [
            { label: "Ver", icon: <ReadOutlined />, key: "/ingredientes" },
            {
              label: "Agregar",
              icon: <FileAddOutlined />,
              key: "/agregarIngrediente",
            },
          ],
        },
        { label: "Log out", icon: <LogoutOutlined />, key: "/logout" },
      ]);
    } else {
      setItems([
        { label: "Sign in", icon: <UsergroupAddOutlined />, key: "/signin" },
        { label: "Log in", icon: <LoginOutlined />, key: "/login" },
      ]);
    }
  }, [user]);

  return (
    <Menu
      className="menu-bar"
      defaultSelectedKeys={[window.location.pathname]}
      mode="inline"
      theme="dark"
      items={items}
      onClick={({ key }) => {
        if (key === "/logout") {
          logout();
        } else {
          navigate(key);
        }
      }}
    />
  );
};

export default MenuListItem;

// <Menu theme="dark" mode="inline" className="menu-bar">
//   <Menu.Item key="home" icon={<HomeOutlined />}>
//     <Link to={`/`}>Home</Link>
//   </Menu.Item>
//   <Menu.Item key="login" icon={<LoginOutlined />}>
//     <Link to={`/login`}>Login</Link>
//   </Menu.Item>
//   <Menu.Item key="registrarse" icon={<UsergroupAddOutlined />}>
//     <Link to={`/signin`}>Sign in</Link>
//   </Menu.Item>
//   <Menu.SubMenu
//     key="crudingredientes"
//     icon={<BarsOutlined />}
//     title="Ingredientes"
//   >
//     <Menu.Item key="verIngrediente" icon={<ReadOutlined />}>
//       <Link to={`/ingredientes`}>Ver</Link>
//     </Menu.Item>
//     <Menu.Item key="agregarIngrediente" icon={<FileAddOutlined />}>
//       <Link to={`/agregarIngrediente`}>Agregar</Link>
//     </Menu.Item>
//   </Menu.SubMenu>
//   <Menu.Item key="logout" icon={<LogoutOutlined />}>
//     <Link to={`/logout`}>Logout</Link>
//   </Menu.Item>
// </Menu>
