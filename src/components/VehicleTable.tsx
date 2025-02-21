function VehicleTable() {
    return(
        <table className="border-separate md:border-spacing-x-10 lg:border-spacing-x-20">
            <tr className="cursor-pointer">
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Body Style</th>
                <th>Mileage</th>
                <th>Miles Per Year</th>
                <th>Fuel Type</th>
                <th>Needs Repair</th>
            </tr>
        </table>
    )
}

export default VehicleTable