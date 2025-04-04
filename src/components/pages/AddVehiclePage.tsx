import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router';

function AddVehiclePage() {
    const navigate = useNavigate()

    const createVehicle = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        function makeId() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 10) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        try {
            await setDoc(doc(db, "vehicles", makeId()), {
                make: formData.get('make'),
                model: formData.get('model'),
                year: Number(formData.get('year')),
                bodyStyle: formData.get('bodyStyle'),
                mileage: Number(formData.get('mileage')),
                milesPerYear: 0,
                fuelType: formData.get('fuelType'),
                needsRepair: formData.get('needsRepair') === 'yes',
                available: true
            });

            navigate('/vehicle-manager')
        } catch (err) {
            console.error("Error adding vehicle:", err);
        }
    };

    const handleClose = () => {
        navigate('/vehicle-manager')
    }

    return(
        <div className="fixed inset-0 shadow-xl flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-xl font-bold mb-4">Create Vehicle</h1>
                    <form onSubmit={createVehicle} className="space-y-3">
                        <div>
                            <label htmlFor="make" className="block text-sm font-medium">Make</label>
                            <input type="text" name="make" id="make" className="mt-1 block w-full border rounded-md p-2" required />
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium">Model</label>
                            <input type="text" name="model" id="model" className="mt-1 block w-full border rounded-md p-2" required />
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium">Year</label>
                            <input type="number" name="year" id="year" className="mt-1 block w-full border rounded-md p-2" required />
                        </div>

                        <div>
                            <label htmlFor="bodyStyle" className="block text-sm font-medium">Body Style</label>
                            <select name="bodyStyle" id="bodyStyle" className="mt-1 block w-full border rounded-md p-2" required>
                                <option value="">--Please choose an option--</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Truck">Truck</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mileage" className="block text-sm font-medium">Mileage</label>
                            <input type="number" name="mileage" id="mileage" className="mt-1 block w-full border rounded-md p-2" required />
                        </div>

                        <div>
                            <label htmlFor="fuelType" className="block text-sm font-medium">Fuel Type</label>
                            <select name="fuelType" id="fuelType" className="mt-1 block w-full border rounded-md p-2" required>
                                <option value="">--Please choose an option--</option>
                                <option value="Gas">Gas</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="needsRepair" className="block text-sm font-medium">Needs Repair</label>
                            <select name="needsRepair" id="needsRepair" className="mt-1 block w-full border rounded-md p-2" required>
                                <option value="">--Please choose an option--</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-700 text-white rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddVehiclePage