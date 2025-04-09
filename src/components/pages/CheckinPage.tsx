import { useNavigate } from "react-router"

function CheckinPage() {
    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/my-trips')
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="check-out-container bg-white w-full max-w-md p-4 shadow-2xl rounded-2xl">
                <h1 className="text-4xl font-bold">Checkin Form</h1>

                <form className="checkout-form [&>div]:my-5">
                    
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-700 text-white rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckinPage