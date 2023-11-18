import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./navbar.css";
import Logo from "./Logo";
// import MenuList from "./MenuList";
import HomeContainer from "./HomeContainer";
import FormuLogin from "./FormuLogin";
import MenuListItem from "./MenuListItem";
import ProtectedRoute from "./ProtectedRoute";
const { Sider, Content } = Layout;
function LayoutContainer() {
  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuListItem />
      </Sider>
      <Content>
        <Routes>
          <Route exact path="/login" element={<FormuLogin />} />
          <Route
            exact
            path="/signin"
            element={<div>ACA VA EL FORM PARA Registrarse</div>}
          />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomeContainer />} />
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
            {/* <Registro /> */}
            <Route
              exact
              path="/logout"
              element={<div>ACA VA La pantalla de logout</div>}
            />
            {/* <Logout /> */}
          </Route>
        </Routes>
      </Content>
    </Layout>
  );
}

export default LayoutContainer;
