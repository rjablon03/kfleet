import { average, collection, getAggregateFromServer, getDocs, query, sum, where } from "firebase/firestore"
import Header from "../Header"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Vehicle } from "../../models/Vehicle"

function Analytics() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [totalCarbon, setTotalCarbon] = useState(0)
    const [averageCarbon, setAverageCarbon] = useState(0)
    const [miles, setMiles] = useState(0)
    const [evMiles, setEvMiles] = useState(0)

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'vehicles'));
                const vehicleList: Vehicle[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const vehicle = new Vehicle(
                        doc.id, 
                        data.make,
                        data.model,
                        data.modelId,
                        data.year,
                        data.bodyStyle,
                        data.mileage,
                        data.fuelType,
                        data.needsRepair,
                        data.available
                    );
                    vehicleList.push(vehicle);
                });
                setVehicles(vehicleList);
            } catch (error) {
                console.error("Error fetching vehicles: ", error);
            }
        };
        
        fetchVehicles();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const coll = collection(db, 'checkouts')
            const initialQuery = query(coll)
            const initialSnapshot = await getAggregateFromServer(initialQuery, {
                totalCarbon: sum('carbonEstimate'),
                avgCarbon: average('carbonEstimate'),
                totalMiles: sum('miles')
            })

            setTotalCarbon(Math.round(initialSnapshot.data().totalCarbon))
            setAverageCarbon(Math.round(initialSnapshot.data().avgCarbon ?? 0))
            setMiles(Math.round(initialSnapshot.data().totalMiles))

            const electricVehicles = vehicles.filter((vehicle) => vehicle.fuelType === "Electric")
            const evIds = electricVehicles.map((vehicle) => vehicle.id)
            if (evIds.length > 0) {
                const evMilesQuery = query(coll, where('vehicleId', 'in', evIds))
                const evSnapshot = await getAggregateFromServer(evMilesQuery, {
                    totalEvMiles: sum('miles')
                })
            
                setEvMiles(evSnapshot.data().totalEvMiles ?? 0)
            } else {
                setEvMiles(0)
            }
        }

        fetchData()
    }, [vehicles])

    return (
        <>
            <Header />
            <div className="w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto my-5">
                <h1 className="text-4xl font-bold border-b-4 border-b-sky-600 w-fit">Analytics</h1>
                <div className="summary flex justify-evenly text-center my-5">
                    <div className="total-carbon">
                        <h2 className="text-2xl font-bold">Total Carbon Output</h2>
                        <p className="text-2xl">{`${totalCarbon} lbs`}</p>
                    </div>
                    <div className="avg-carbon">
                        <h2 className="text-2xl font-bold">Average Carbon Output</h2>
                        <p className="text-2xl">{`${averageCarbon} lbs`}</p>
                    </div>
                    <div className="total-miles">
                        <h2 className="text-2xl font-bold">Total Miles</h2>
                        <p className="text-2xl">{`${miles} miles`}</p>
                    </div>
                    <div className="ev-miles">
                        <h2 className="text-2xl font-bold">Total EV Miles</h2>
                        <p className="text-2xl">{`${evMiles} miles`}</p>
                    </div>
                </div>
                <div className="top-five-cars">

                </div>
            </div>
        </>
    )
}

export default Analytics