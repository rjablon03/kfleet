interface CarData {
    vehicleId: string
    make: string
    model: string
    year: number
    availability: boolean
}

function VehicleCard(props: CarData) {
    const cls = (input: [string, string]) => input.filter((cond) => typeof cond === "string").join(" ").trim()

    return (
        <div className="card bg-white border-3 border-black shadow-2xl w-[20%] my-2">
            <p className="name pl-2 text-xl font-bold">{props.year} {props.make} {props.model}</p>
            <a href={"/checkout/" + props.vehicleId} className="pl-2 underline hover:text-sky-700">Check out</a>
            <p className={cls(["availability px-2 text-white font-bold", props.availability === true ? "bg-green-600" : "bg-red-600"])}>1/19/25</p>
        </div>
    )
}

export default VehicleCard