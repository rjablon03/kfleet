import VehicleCard from "./VehicleCard";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Vehicle } from "../models/Vehicle";

interface CollectionInfo {
    title: string
}

function VehicleCollection(props: CollectionInfo) {
    const available = props.title === "Available"

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesQuery = query(
                collection(db, 'vehicles'),
                where("available", "==", available),
                where("needsRepair", "==", false)
            );
    
            const querySnapshot = await getDocs(vehiclesQuery)
            let newVehicles: Vehicle[] = []
    
            querySnapshot.forEach((doc) => {
                const data = doc.data()
    
                const newVehicle: Vehicle = {
                    id: doc.id,
                    make: data.make,
                    modelId: data.modelId,
                    model: data.model,
                    year: data.year,
                    bodyStyle: data.bodyStyle,
                    mileage: data.mileage,
                    fuelType: data.fuelType,
                    needsRepair: data.needsRepair,
                    available: data.available
                };
    
                newVehicles.push(newVehicle);
              });

              setVehicles(newVehicles)
        }
    
        fetchVehicles()
    }, [])

    return (
        <div className="collection-container w-[85%] my-5">
            <h2 className="text-4xl font-bold border-b-4 border-b-sky-600 w-fit">{props.title}</h2>
            <div className="vehicle-cards md:flex md:flex-wrap md:justify-between lg:grid lg:grid-cols-3 lg:place-items-center">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicleId={vehicle.id} vehicleModelId={vehicle.modelId} year={vehicle.year} make={vehicle.make} model={vehicle.model} availability={vehicle.available}/>
                ))}
            </div>
        </div>
    );
}

export default VehicleCollection