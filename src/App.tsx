import Header from "./components/Header"
import VehicleCollection from "./components/VehicleCollection"

function App() {
  return (
    <>
      <Header />
      
      <div className="body-container flex flex-col items-center">
        <VehicleCollection title='Available Vehicles'/>
        <VehicleCollection title='Unavailable Vehicles'/>
        <VehicleCollection title='In The Shop'/>
      </div>
    </>
  )
}

export default App
