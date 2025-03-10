import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Vehicle } from '../models/Vehicle'

function VehicleTable() {
    return(
        <table className="border-separate w-full text-left border-spacing-y-1.5">
            <tr className="">
                <th className="text-xl">Make</th>
                <th className="text-xl">Model</th>
                <th className="text-xl">Year</th>
                <th className="text-xl">Body Style</th>
                <th className="text-xl">Mileage</th>
                <th className="text-xl">Miles Per Year</th>
                <th className="text-xl">Fuel Type</th>
                <th className="text-xl">Needs Repair</th>
            </tr>
        </table>
    )
}

export default VehicleTable