import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/pages/Home";
import VehicleManager from "./components/pages/VehicleManager";
import LoginPage from "./components/pages/LoginPage";
import EditVehicle from "./components/pages/EditVehicle";


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <LoginPage />}></Route>
        <Route path='/vehicle-manager' element={isAuthenticated ? <VehicleManager /> : <LoginPage />}></Route>
        <Route path='/vehicle-manager/edit-vehicle/:id' element={isAuthenticated ? <EditVehicle /> : <LoginPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;