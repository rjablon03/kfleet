import { useState } from "react"

function AddVehicle() {
    const [open, setOpen] = useState(false)

    const openDialog = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const createVehicle = async () => {
        // import db and write create code
    }

    return (
        <>
            <button className="add-vehicle block my-3 w-[90%] mx-auto border-2 border-gray-500 border-dashed rounded-md text-gray-500 hover:bg-sky-700 hover:text-white hover:border-0 hover:p-0.5" onClick={openDialog}>Add Vehicle</button>

            <dialog open={open} onClose={handleClose}>
                <h1>Create Vehicle</h1>
                <form onSubmit={createVehicle}>
                    <label htmlFor="make">Make</label>
                    <input type="text" name="make" id="make" />

                    <label htmlFor="model">Model</label>
                    <input type="text" name="model" id="model" />

                    <label htmlFor="year">Year</label>
                    <input type="number" name="year" id="year" />

                    <label htmlFor="bodyStyle">Body Style</label>
                    <input type="text" name="bodyStyle" id="bodyStyle" />

                    <label htmlFor="mileage">Mileage</label>
                    <input type="number" name="mileage" id="mileage" />

                    <label htmlFor="fuelType">Fuel Type</label>
                    <select name="fuelType" id="fuelType">
                        <option value="gas">Gas</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                    </select>

                    <label htmlFor="needsRepair">Needs Repair</label>
                    <select name="needsRepair" id="needsRepair">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <button type="submit">Create</button>
                    <button onClick={handleClose}>Cancel</button>
                </form>
            </dialog>
        </>
    )
}

export default AddVehicle