import { Link } from "react-router"
import Header from "../Header"
import VehicleTable from "../VehicleTable"

function VehicleManager() {
    return (
        <>
            <div className="lg:hidden">
                <h1 className="text-4xl font-bold">Please view on desktop</h1>
                <Link to="/" className="text-2xl text-sky-700 underline">Back home</Link>
            </div>

            <div className="hidden lg:block">
                <Header />
                <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto my-5">
                    <VehicleTable />
                </div>
            </div>
        </>
    )
}

export default VehicleManager