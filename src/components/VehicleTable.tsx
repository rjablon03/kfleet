import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Vehicle } from '../models/Vehicle'
import { useEffect, useState } from 'react';

function VehicleTable() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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

    return(
        <table className="border-separate w-[95%] m-auto text-left border-spacing-y-1.5">
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
                            <input type="checkbox" />
                        </td>
                        <td>{vehicle.make}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.bodyStyle}</td>
                        <td>{vehicle.mileage}</td>
                        <td>{vehicle.fuelType}</td>
                        <td>{vehicle.needsRepair ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default VehicleTable