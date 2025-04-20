import { useEffect, useState } from "react"
import Header from "../Header"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Checkout } from "../../models/Checkout";
import { useAuth0 } from "@auth0/auth0-react";
import {format} from 'date-fns'
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
                    where("checkedIn", "==", false)
                )
                const querySnapshot = await getDocs(checkoutQuery)

                const tripList: Checkout[] = []
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    tripList.push(new Checkout(
                        doc.id, 
                        data.userId, 
                        data.vehicleId, 
                        data.vehicleInfo,
                        data.startDate, 
                        data.endDate, 
                        data.miles, 
                        data.carbonEstimate,
                        data.description, 
                        data.checkedIn,
                        data.project
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

    const deleteTrip = async (checkoutId: string) => {
        try {
            const updatedCheckouts = checkouts.filter((checkout) => checkoutId !== checkout.id)
            setCheckouts(updatedCheckouts)
            await deleteDoc(doc(db, 'checkouts', checkoutId))
        } catch (err) {
            console.log(err)
            return
        }
    }

    return (
        <>
            <Header />
            <div>
                {checkouts.length !== 0 ? (
                    <div className="lg:grid lg:grid-cols-3">
                        {checkouts.map((item) => (
                            <div key={item.id} className="bg-white my-5 w-[80%] mx-auto p-2 shadow-2xl rounded-2xl flex flex-col justify-between md:w-[45%] lg:w-[80%]">
                                <div>
                                    <p className="font-bold text-2xl">{`${item.vehicleInfo[0]} ${item.vehicleInfo[1]} ${item.vehicleInfo[2]}`}</p>
                                    <p className="text-2xl"><span className="font-bold">From: </span>{format(item.startDate, "MMM d, yyyy h:mm a")}</p>
                                    <p className="text-2xl"><span className="font-bold">To: </span>{format(item.endDate, "MMM d, yyyy h:mm a")}</p>
                                    <p className="text-2xl"><span className="font-bold">Carbon Output: </span>{`${item.carbonEstimate} lbs`}</p>
                                    <p className="text-2xl"><span className="font-bold">Reason: </span>{item.project ? item.project : item.description}</p>
                                </div>
                                <div className="flex justify-center gap-5 my-2">
                                    <p className="bg-sky-700 text-white font-bold p-2 rounded-xl"><Link to={'/my-trips/' + item.id} className=''>Check In</Link></p>
                                    <button className="bg-red-500 text-white font-bold p-2 rounded-xl" onClick={() => deleteTrip(item.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-4xl">No Trips Found</h1>
                )}
            </div>
        </>
    )
}

export default MyTrips