import Header from "../Header"
import VehicleTable from "../VehicleTable"
import AddVehicle from "../AddVehicle"

function VehicleManager() {
    return (
        <>
            <Header />
            <AddVehicle />
            <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto">
                <VehicleTable />
            </div>
        </>
    )
}

export default VehicleManager