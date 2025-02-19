import Header from "./components/Header"
import VehicleCollection from "./components/VehicleCollection"

function App() {
  return (
    <>
      <Header />
      
      <div className="body-container flex justify-center">
        <VehicleCollection />
      </div>
    </>
  )
}

export default App
