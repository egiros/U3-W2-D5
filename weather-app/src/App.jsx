import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import NotFound from "./component/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Counter /> */}
        <NavBar brand="Weather EpicApp" claim="Controlla se devi portare l'ombrello?" />
        <Routes>
          <Route path="/" element={<Home className="mt-5" fontSize="fs-1" textSize="fs-5" />} />
          {/* <Route path="/prenotazioni" element={<ReservationList />} /> */}
          {/* i : servono ad indicare che per attivare il componente PastaDetails ci dovrà essere un indirizzo composto da 3 elementi:
          1) /menu 
          2) /dettagli 
          3) /:pastaId (che è un parametro dinamico)
          il parametro dinamico può avere un valore qualsiasi, purché esista
          */}
          {/* <Route path="/menu/dettagli/:pastaId" element={<PastaDetails />} />
          <Route path="/class-component/:dynamicId" element={<ClassComponent className="mt-5" />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
