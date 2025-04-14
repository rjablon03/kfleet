import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function AddVehiclePage() {
    const navigate = useNavigate()
    const [year, setYear] = useState(0)
    const [makes, setMakes] = useState<{ name: string; makeId: string }[]>([])
    const [make, setMake] = useState<string>("")
    const [model, setModel] = useState<string>("")
    const [models, setModels] = useState([])
    const carbonMakesURL = import.meta.env.VITE_CARBON_MAKES_ENDPOINT
    const carbonKey = import.meta.env.VITE_CARBON_INTERFACE

    useEffect(() => {
        const fetchGetMakes = async () => {
            fetch(carbonMakesURL, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${carbonKey}`,
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch')
                    }
                    return response.json()
                })
                .then(data => {
                    const makeArray: { name: string; makeId: string }[] = []

                    data.forEach((i: { data: { attributes: { name: any; }; id: any; }; }) => {
                        makeArray.push({name: i.data.attributes.name, makeId: i.data.id})
                    })

                    setMakes(makeArray)
                })
                .catch(error => {
                    console.log('Error', error)
                })
            
            }
        fetchGetMakes()
    }, [])

    useEffect(() => {
        if (!make) return;
        
        
        fetch(`https://www.carboninterface.com/api/v1/vehicle_makes/${make}/vehicle_models`, {
            headers: {
                'Authorization': `Bearer ${carbonKey}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch models")
            }
            return response.json()
        })
        .then(data => {
            const modelArray = data
                .filter((modelItem: any) => modelItem.data.attributes.year === year)
                .map((modelItem: any) => ({
                    name: modelItem.data.attributes.name,
                    modelId: modelItem.data.id,
                    year: modelItem.data.attributes.year
                }));
            setModels(modelArray);
        })
        .catch(err => {
            console.log("Model fetch error:", err);
        });
    }, [make]);
    

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
            const makeRaw = formData.get('make') as string
            const [carMakeId, carMakeName] = makeRaw.split(',')
            const modelRaw = formData.get('model') as string;
            const [modelId, modelName, modelYear] = modelRaw.split(',');

            await setDoc(doc(db, "vehicles", makeId()), {
                make: carMakeName,
                carMakeId: carMakeId,
                model: modelName,
                modelId: modelId,
                year: modelYear,
                bodyStyle: formData.get('bodyStyle'),
                mileage: Number(formData.get('mileage')),
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
                            <label htmlFor="year" className="block text-sm font-medium">Year</label>
                            <input type="number" name="year" id="year" className="mt-1 block w-full border rounded-md p-2" onChange={e => setYear(Number(e.target.value))} required />
                        </div>

                        <div>
                            <label htmlFor="make" className="block text-sm font-medium">Make</label>
                            <select name="make" id="make" className="mt-1 block w-full border rounded-md p-2" onChange={(e) => setMake(e.target.value.split(',')[0])} required>
                                <option value="">--Please choose an option--</option>
                                {makes.map((make) => (
                                    <option key={make.makeId} value={[make.makeId, make.name]}>{make.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium">Model</label>
                            <select name="model" id="model" className="mt-1 block w-full border rounded-md p-2" value={model} onChange={(e) => setModel(e.target.value)} required>
                                <option value="">--Please choose a model--</option>
                                {models.map((m: any) => (
                                    <option key={m.modelId} value={`${m.id},${m.name},${m.year}`}>{`${m.year} - ${m.name}`}</option>
                                ))}
                            </select>
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