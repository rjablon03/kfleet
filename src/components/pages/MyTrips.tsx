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
                        data.description, 
                        data.project))
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
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle Info</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.vehicleId}</td>
                                <td>{format(item.startDate, "MMM d, yyyy h:mm a")}</td>
                                <td>{format(item.endDate, "MMM d, yyyy h:mm a")}</td>
                                <td>{item.project}</td>
                                <td><Link to={'/my-trips/' + item.id}>Check In</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyTrips