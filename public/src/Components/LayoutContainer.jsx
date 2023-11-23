import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

// import MenuList from "./MenuList";
import HomeContainer from "./HomeContainer";
import FormuLogin from "./FormuLogin";
import MenuListItem from "./MenuListItem";
import ProtectedRoute from "./ProtectedRoute";
import FormuRegistro from "./FormuRegistro";
import VerIngredientes from "./VerIngredientes";
import FormuAgregarIngrediente from "./FormuAgregarIngrediente";
import Sockets from "../Pags/Sockets";

const { Sider, Content } = Layout;
function LayoutContainer() {
  return (
    <Layout>
      <Sider className="sidebar">
        <MenuListItem />
      </Sider>
      <Content>
        <Routes>
          <Route exact path="/login" element={<FormuLogin />} />
          <Route exact path="/signin" element={<FormuRegistro />} />
          <Route exact path="/sockets" element={<Sockets/>}/>

          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomeContainer />} />
            <Route
              exact
              path="/ingredientes"
              element={<VerIngredientes />}
              
            />
            <Route
              exact
              path="/agregarIngrediente"
              element={<FormuAgregarIngrediente />}
            />          
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
