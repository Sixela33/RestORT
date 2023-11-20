import { BrowserRouter } from "react-router-dom";
import LayoutContainer from "./Components/LayoutContainer";
import ImageUploadForm from "./Components/ImageUploadForm";

function App() {
  return (
    <>
      {/* <ImageUploadForm /> */}
      <BrowserRouter>
        <LayoutContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
