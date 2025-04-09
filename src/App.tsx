import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/pages/Home";
import VehicleManager from "./components/pages/VehicleManager";
import LoginPage from "./components/pages/LoginPage";
import EditVehicle from "./components/pages/EditVehicle";
import AddVehiclePage from "./components/pages/AddVehiclePage";
import CheckoutPage from "./components/pages/CheckoutPage";
import MyTrips from "./components/pages/MyTrips";
import Analytics from "./components/pages/Analytics";
import CheckinPage from "./components/pages/CheckinPage";


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <LoginPage />}></Route>
        <Route path='/vehicle-manager' element={isAuthenticated ? <VehicleManager /> : <LoginPage />}></Route>
        <Route path='/vehicle-manager/edit-vehicle/:id' element={isAuthenticated ? <EditVehicle /> : <LoginPage />}></Route>
        <Route path='/vehicle-manager/add-vehicle' element={isAuthenticated ? <AddVehiclePage /> : <LoginPage />}></Route>
        <Route path='/checkout/:id' element={isAuthenticated ? <CheckoutPage /> : <LoginPage />}></Route>
        <Route path='/my-trips' element={isAuthenticated ? <MyTrips /> : <LoginPage />}></Route>
        <Route path='/my-trips/:id' element={isAuthenticated ? <CheckinPage /> : <LoginPage />} />
        <Route path='/analytics' element={isAuthenticated ? <Analytics /> : <LoginPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;