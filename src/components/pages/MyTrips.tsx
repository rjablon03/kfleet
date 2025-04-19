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
    const [removeCheckouts, setRemoveCheckouts] = useState<string[]>([]);

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

    const prepRemoval = (event: React.ChangeEvent<HTMLInputElement>, vehicleId: string) => {
        if (event.target.checked === true) {
            setRemoveCheckouts(prev => [...prev, vehicleId]);
        }
        else {
            setRemoveCheckouts(prev => prev.filter(id => id !== vehicleId))
        }
    }

    const deleteCheckouts = async () => {
            if (removeCheckouts.length > 0) {
                try {
                    await Promise.all(
                        removeCheckouts.map(async (checkoutId) => {
                            await deleteDoc(doc(db, 'checkouts', checkoutId));
                        })
                    );
                    setCheckouts(prev => prev.filter(checkout => !removeCheckouts.includes(checkout.id)));
                    setRemoveCheckouts([]);
                } catch (error) {
                    console.error("Error deleting vehicles: ", error);
                }
            }
        };

    return (
        <>
            <Header />
            <div className="table-container w-[90%] bg-white shadow-xl p-4 rounded-md mx-auto my-5">
                {checkouts.length !== 0 ? (
                    <table className="border-separate w-[95%] m-auto text-left border-spacing-y-4 border-spacing-x-1 lg:border-spacing-x-3 xl:border-spacing-x-11">
                    <thead>
                        <tr>
                            <th></th>
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
                                <td>
                                <input type="checkbox" onChange={(event) => prepRemoval(event, item.id)}/></td>
                                <td className="text-xs lg:text-base">{`${item.vehicleInfo[0]} ${item.vehicleInfo[1]} ${item.vehicleInfo[2]}`}</td>
                                <td className="text-xs lg:text-base">{format(item.startDate, "MMM d, yyyy h:mm a")}</td>
                                <td className="text-xs lg:text-base">{format(item.endDate, "MMM d, yyyy h:mm a")}</td>
                                <td className="text-xs lg:text-base">{item.carbonEstimate}</td>
                                <td className="text-xs lg:text-base">{item.project ? item.project : item.description}</td>
                                <td className="text-xs lg:text-base"><Link to={'/my-trips/' + item.id} className='bg-sky-700 text-white font-bold p-2 rounded-xl'>Check In</Link></td>
                                <td className="text-xs lg:text-base"><Link to={`/checkout/edit?vehicleId=${item.vehicleId}&checkoutId=${item.id}`} className='bg-sky-700 text-white font-bold p-2 rounded-xl'>Edit</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <h1 className="text-5xl font-bold text-center">No Trips Found</h1>
                )}
                {removeCheckouts.length > 0 && (<button className="delete-checkouts bg-red-500 p-1 rounded-md text-white font-bold my-2" onClick={deleteCheckouts}>Delete</button>)}
            </div>
        </>
    )
}

export default MyTrips