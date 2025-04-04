import Header from "../Header"
import VehicleTable from "../VehicleTable"

function VehicleManager() {
    return (
        <>
            <Header />
            <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto my-5">
                <VehicleTable />
            </div>
        </>
    )
}

export default VehicleManager