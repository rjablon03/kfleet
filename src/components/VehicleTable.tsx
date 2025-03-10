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
            <tr>
                <td>Honda</td>
                <td>Civc</td>
                <td>2025</td>
                <td>Sedan</td>
                <td>2000</td>
                <td>2000</td>
                <td>Gas</td>
                <td>Yes</td>
                <td>
                    <div className="buttons">
                        <button className="bg-gray-500 text-white font-bold px-3 mr-2 rounded-md">Info</button>
                        <button className="bg-red-500 text-white font-bold px-3 rounded-md">Delete</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Toyota</td>
                <td>RAV4</td>
                <td>2023</td>
                <td>SUV</td>
                <td>33591</td>
                <td>2331</td>
                <td>Gas</td>
                <td>No</td>
                <td>
                    <div className="buttons">
                        <button className="bg-gray-500 text-white font-bold px-3 mr-2 rounded-md">Info</button>
                        <button className="bg-red-500 text-white font-bold px-3 rounded-md">Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    )
}

export default VehicleTable