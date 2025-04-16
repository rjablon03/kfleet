import { useEffect, useState } from "react"
import Header from "../Header"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Checkout } from "../../models/Checkout";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns"
import { Link } from "react-router";

function MyTrips() {
    const { user } = useAuth0()
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const checkoutQuery = query(
                    collection(db, 'checkouts'),
                    where("userId", "==", user?.sub),
                    where("open", "==", true)
                )
                const querySnapshot = await getDocs(checkoutQuery)

                const tripList: Checkout[] = []
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    tripList.push(new Checkout(
                        doc.id, 
                        data.userId, 
                        data.vehicleId, 
                        data.startDate, 
                        data.endDate, 
                        data.miles, 
                        data.carbonEstimate,
                        data.description, 
                        data.project,
                    ))
                })

                setCheckouts(tripList)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchTrips()
    }, [])

    return (
        <>
            <Header />
            <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto my-5">
                {checkouts.length !== 0 ? (
                    <table className="border-separate w-[95%] m-auto text-left border-spacing-y-4 border-spacing-x-1 lg:border-spacing-x-3 xl:border-spacing-x-11">
                    <thead>
                        <tr>
                            <th className="lg:text-xl">Vehicle Info</th>
                            <th className="lg:text-xl">Start Date</th>
                            <th className="lg:text-xl">End Date</th>
                            <th className="lg:text-xl">Carbon Output (lbs)</th>
                            <th className="lg:text-xl">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.map((item) => (
                            <tr key={item.id}>
                                <td className="text-xs lg:text-base">{item.vehicleId}</td>
                                <td className="text-xs lg:text-base">{format(item.startDate, "MMM d, yyyy h:mm a")}</td>
                                <td className="text-xs lg:text-base">{format(item.endDate, "MMM d, yyyy h:mm a")}</td>
                                <td className="text-xs lg:text-base">{item.carbonEstimate}</td>
                                <td className="text-xs lg:text-base">{item.project ? item.project : item.description}</td>
                                <td className="text-xs lg:text-base"><Link to={'/my-trips/' + item.id} className='bg-sky-700 text-white font-bold p-2 rounded-xl'>Check In</Link></td>
                                <td className="text-xs lg:text-base"><Link to="/" className='bg-sky-700 text-white font-bold p-2 rounded-xl'>Edit</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <h1 className="text-5xl font-bold text-center">No Trips Found</h1>
                )}
            </div>
        </>
    )
}

export default MyTrips