import { BrowserRouter } from "react-router-dom";
import LayoutContainer from "./Components/LayoutContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
