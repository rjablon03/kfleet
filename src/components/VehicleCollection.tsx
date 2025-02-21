interface CollectionInfo {
    title: string
}

function VehicleCollection(props: CollectionInfo) {
    return (
        <div className="collection-container w-[90%] bg-white shadow-xl p-4 rounded-md my-5">
            <h2 className="text-2xl font-bold border-b-4 border-b-sky-600 w-fit">{props.title}</h2>
        </div>
    );
}

export default VehicleCollection