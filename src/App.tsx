import { Routes, Route } from "react-router";
import Home from "./components/pages/Home";
import VehicleManager from "./components/pages/VehicleManager";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/vehicle-manager' element={<VehicleManager />}></Route>
    </Routes>
  )
}

export default App
