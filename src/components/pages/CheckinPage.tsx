import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore"
import { useNavigate, useParams } from "react-router"
import { db } from "../../config/firebase"
import { useState } from "react"

function CheckinPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState("")
    const [errorFlag, setErrorFlag] = useState(<></>)
    const [showNoteInput, setShowNoteInput] = useState(false)
    const [note, setNote] = useState("")

    const handleClose = () => {
        navigate('/my-trips')
    }

    const checkin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const endingMileage = Number(formData.get("endingMileage"))

        if (!id) {
            throw new Error("ID is undefined")
        }

        const checkoutRef = doc(db, 'checkouts', id)
        const checkoutDoc = await getDoc(checkoutRef)
        const vehicleId = checkoutDoc.get('vehicleId')
        const vehicleRef = doc(db, 'vehicles', vehicleId)
        const vehicleDoc = await getDoc(vehicleRef)

        if (endingMileage <= vehicleDoc.get('mileage')) {
            setError("Mileage cannot be less than or equal to previous mileage!")
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

            if (note.trim() !== "") {
                await addDoc(collection(db, "notes"), {
                    vehicleId,
                    note,
                    timestamp: new Date()
                })
            }

            navigate('/my-trips')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="check-out-container bg-white w-full max-w-md p-4 shadow-2xl rounded-2xl">
                <h1 className="text-4xl font-bold">Are you sure?</h1>
                <h2 className="text-lg font-bold">Checking In A Vehicle Cannot Be Undone</h2>

                {errorFlag}

                <form onSubmit={checkin} className="checkin-form [&>div]:my-5">
                    <div>
                        <label htmlFor="endingMileage">Ending Mileage</label>
                        <input
                            type="number"
                            name="endingMileage"
                            id="endingMileage"
                            className="mt-1 inline w-full border rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="my-2">
                        <button
                            type="button"
                            className="text-sm text-blue-700 underline"
                            onClick={() => setShowNoteInput(!showNoteInput)}
                        >
                            {showNoteInput ? "Hide Notes" : "Add Notes"}
                        </button>
                    </div>

                    {showNoteInput && (
                        <div>
                            <label htmlFor="note">Notes</label>
                            <textarea
                                name="note"
                                id="note"
                                className="mt-1 w-full border rounded-md p-2"
                                rows={3}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    )}

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
