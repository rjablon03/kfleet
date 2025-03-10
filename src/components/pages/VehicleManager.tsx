import Header from "../Header"
import VehicleTable from "../VehicleTable"

function VehicleManager() {
    return (
        <>
            <Header />
            
            <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md my-5 mx-auto">
                <VehicleTable />
            </div>
        </>
    )
}

export default VehicleManager