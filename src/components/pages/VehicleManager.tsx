import Header from "../Header"
import CreateVehicle from "../CreateVehicle"

function VehicleManager() {
    return (
        <>
            <Header />
            
            <div className="vehicles-container flex flex-wrap justify-evenly gap-5 my-5">
                <CreateVehicle />
                <CreateVehicle />
                <CreateVehicle />
                <CreateVehicle />
                <CreateVehicle />
                <CreateVehicle />
            </div>
        </>
    )
}

export default VehicleManager