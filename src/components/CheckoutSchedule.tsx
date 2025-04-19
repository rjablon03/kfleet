import { Checkout } from "../models/Checkout"
import { format } from "date-fns"

interface CheckoutData {
    checkouts: Checkout[]
}

function CheckoutSchedule(props: CheckoutData) {
    const checkouts = props.checkouts.filter((checkout) => !checkout.checkedIn)
    if (checkouts.length === 0) {
        return
    }

    return (
        <div className={props.checkouts.length > 0 ? "bg-white ml-3 p-3 rounded-2xl shadow-2xl" : "hidden"}>
            <h1 className="text-2xl font-bold">Vehicle Schedule</h1>
            {props.checkouts
                .map((checkout) => (
                    <p key={checkout.id}>{`${format(checkout.startDate, "MMM d, yyyy h:mm a")} - ${format(checkout.endDate, "MMM d, yyyy h:mm a")}`}</p>
                ))}
        </div>
    )
}

export default CheckoutSchedule