import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router"
import { db } from "../../config/firebase"
import { useState } from "react"

function CheckinPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState("")
    const [errorFlag, setErrorFlag] = useState(<></>)

    const handleClose = () => {
        navigate('/my-trips')
    }

    const checkin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const endingMileage = Number(formData.get("endingMileage"));

        if (!id) {
            throw new Error("ID is undefined");
        }

        const checkoutRef = doc(db, 'checkouts', id)
        const checkoutDoc = await getDoc(checkoutRef);
        const vehicleRef = doc(db, 'vehicles', checkoutDoc.get('vehicleId'))
        const vehicleDoc = await getDoc(vehicleRef)

        if (endingMileage <= vehicleDoc.get('mileage')) {
            setError("Mileage wrongy")
            setErrorFlag(<h3 className="text-red-500 text-md font-bold">{error}</h3>)
            return
        }

        try {
            await updateDoc(checkoutRef, {
                open: false,
                checkedIn: true
            })

            await updateDoc(vehicleRef, {
                mileage: endingMileage,
                available: true
            })

            navigate('/my-trips')
        }
        catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="check-out-container bg-white w-full max-w-md p-4 shadow-2xl rounded-2xl">
                <h1 className="text-4xl font-bold">Are you sure?</h1>
                <h2 className="text-lg font-bold">Checking In A Vehicle Cannot Be Undone</h2>

                {errorFlag}

                <form onSubmit={checkin} className="checkin-form [&>div]:my-5">
                    <div>
                        <label htmlFor="endingMileage">Ending Mileage</label>
                        <input type="number" name="endingMileage" id="endingMileage" className="mt-1 inline w-full border rounded-md p-2" required />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-700 text-white rounded">Check In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckinPage