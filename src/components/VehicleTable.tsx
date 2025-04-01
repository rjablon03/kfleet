import { db } from '../config/firebase'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import { Vehicle } from '../models/Vehicle'
import { useEffect, useState } from 'react';

function VehicleTable() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [removeVehicles, setRemoveVehicles] = useState<string[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'vehicles'));
                const vehicleList: Vehicle[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const vehicle: Vehicle = {
                        id: doc.id, 
                        make: data.make,
                        model: data.model,
                        year: data.year,
                        bodyStyle: data.bodyStyle,
                        mileage: data.mileage,
                        milesPerYear: data.milesPerYear,
                        fuelType: data.fuelType,
                        needsRepair: data.needsRepair,
                        available: data.available
                    };
                    vehicleList.push(vehicle);
                });
                setVehicles(vehicleList);
            } catch (error) {
                console.error("Error fetching vehicles: ", error);
            }
        };

        fetchVehicles();
    }, []);

    const prepRemoval = (event: React.ChangeEvent<HTMLInputElement>, vehicleId: string) => {
        if (event.target.checked === true) {
            setRemoveVehicles(prev => [...prev, vehicleId]);
        }
        else {
            setRemoveVehicles(prev => prev.filter(id => id !== vehicleId))
        }
    }

    const deleteVehicles = async () => {
        if (removeVehicles.length > 0) {
            try {
                await Promise.all(
                    removeVehicles.map(async (vehicleId) => {
                        await deleteDoc(doc(db, 'vehicles', vehicleId));
                    })
                );
                setVehicles(prev => prev.filter(vehicle => !removeVehicles.includes(vehicle.id)));
                setRemoveVehicles([]);
            } catch (error) {
                console.error("Error deleting vehicles: ", error);
            }
        }
    };

    return(
        <>
            <table className="border-separate w-[95%] m-auto text-left border-spacing-y-4">
                <thead>
                    <tr className="">
                        <th></th>
                        <th className="text-xl">Car Make</th>
                        <th className="text-xl"> Car Model</th>
                        <th className="text-xl">Year</th>
                        <th className="text-xl">Body Style</th>
                        <th className="text-xl">Mileage</th>
                        <th className="text-xl">Fuel Type</th>
                        <th className="text-xl">Needs Repair</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={(event) => prepRemoval(event, vehicle.id)}
                                />
                            </td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.bodyStyle}</td>
                            <td>{vehicle.mileage}</td>
                            <td>{vehicle.fuelType}</td>
                            <td>{vehicle.needsRepair ? 'Yes' : 'No'}</td>
                            <td><a className='bg-sky-700 text-white font-bold p-2 rounded-xl'>Edit</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {removeVehicles.length > 0 && (<button className="delete-vehicles bg-red-500 p-1 rounded-md text-white font-bold mt-4" onClick={deleteVehicles}>Delete Vehicles</button>)}
        </>
    )
}

export default VehicleTable