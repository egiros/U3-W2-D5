import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import Welcome from "./component/Welcome";
import FiveDay from "./component/FiveDay";
import Footer from "./component/Footer";
import NotFound from "./component/NotFound";

function App() {
  return (
    <div className="App app-container">
      <BrowserRouter>
        <NavBar brand="Weather" claim="EpicApp" className="mb-5" />
        <Welcome />
        <Routes>
          <Route path="/" element={<Home className="mt-5" fontSize="fs-1" textSize="fs-5" />} />
          <Route path="/five-day" element={<FiveDay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer className="mt-5" />
    </div>
  );
}
export default App;
