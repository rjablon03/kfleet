import { collection, limit, orderBy, where, query, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { format } from "date-fns"

interface CarData {
    vehicleId: string
    make: string
    model: string
    year: number
    availability: boolean
}

function VehicleCard(props: CarData) {
    const cls = (input: [string, string]) => input.filter((cond) => typeof cond === "string").join(" ").trim()
    const [nextDate, setNextDate] = useState<string>("")

    useEffect(() => {
        const fetchAvailability = async () => {
            const checkoutsCollection = collection(db, 'checkouts')
            const queryConstraint = query(checkoutsCollection, where('vehicleId', '==', props.vehicleId), where('open', '==', true), orderBy('startDate'), limit(1))
            const querySnapshot = await getDocs(queryConstraint);
            
            if (props.availability === true) {
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data()
                    setNextDate(format(data.startDate, "MMM d, yyyy h:mm a"))
                } else {
                    setNextDate("Available")
                }
            } else {
                const data = querySnapshot.docs[0].data()
                setNextDate(format(data.endDate, "MMM d, yyyy h:mm a"))
            }
        }

        fetchAvailability()
    }, [])

    return (
        <div className="card bg-white border-4 border-black my-3 md:w-[45%] lg:w-[90%] lg:shadow-2xl">
            <p className="name pl-2 text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">{props.year} {props.make} {props.model}</p>
            <a href={"/checkout/" + props.vehicleId} className="pl-2 underline hover:text-sky-700">Check out</a>
            <p className={cls(["availability px-2 text-white font-bold", props.availability === true ? "bg-green-600" : "bg-red-600"])}>{nextDate}</p>
        </div>
    )
}

export default VehicleCard