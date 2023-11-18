import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./navbar.css";
import Logo from "./Logo";
import MenuList from "./MenuList";
import HomeContainer from "./HomeContainer";
import FormuLogin from "./FormuLogin";
const { Header, Sider, Content } = Layout;
function LayoutContainer() {
  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Content>
        <Routes>
          <Route exact path="/" element={<HomeContainer />} />
          <Route exact path="/login" element={<FormuLogin />} />
          <Route
            exact
            path="/ingredientes"
            element={<div>ACA VA LA TABLA CON LOS INGREDIENTES</div>}
            // <IngredientesContainer />}
          />
          {/* <Route
            exact
            path="/ingredientes/eliminar/:idIngrediente"
            element={<EliminarIngrediente />}
          />
          <Route
            exact
            path="/ingredientes/actualizar/:idIngrediente"
            element={<ActualizarIngrediente />}
          /> */}
          <Route
            exact
            path="/agregarIngrediente"
            element={<div>ACA VA EL FORM PARA AGREGAR UN INGREDIENTE</div>}
            // <AgregarIngrediente />}
          />
          <Route
            exact
            path="/signin"
            element={<div>ACA VA EL FORM PARA Registrarse</div>}
          />
          {/* <Registro /> */}
          <Route
            exact
            path="/logout"
            element={<div>ACA VA La pantalla de logout</div>}
          />
          {/* <Logout /> */}
        </Routes>
      </Content>
    </Layout>
  );
}

export default LayoutContainer;
