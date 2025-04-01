import Header from "../Header"
import VehicleCollection from "../VehicleCollection"

function Home() {
    return(
        <>
            <Header />
            
            <div className="collection-container flex flex-col items-center">
                <VehicleCollection title="Available"/>
                <VehicleCollection title="Unavailable"/>
            </div>
        </>
    )
}

export default Home