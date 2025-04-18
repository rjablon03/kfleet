import { db } from "../../config/firebase"
import { useAuth0 } from "@auth0/auth0-react"
import { ReactElement, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { getDocs, collection, setDoc, doc, getDoc, query, where, orderBy  } from "firebase/firestore"
import { Project } from "../../models/Project"
import { Checkout } from "../../models/Checkout"
import CheckoutSchedule from "../CheckoutSchedule"

function CheckoutPage() {
    const [searchParams] = useSearchParams()
    const vehicleId = searchParams.get('vehicleId')
    const vehicleModelId = searchParams.get('vehicleModelId')
    const [vehicleInfo, setVehicleInfo] = useState<[number, string, string]>([0, "", ""])
    const { user } = useAuth0()
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([])
    const [project, setProject] = useState(false)
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);
    const [carbonEstimate, setCarbonEstimate] = useState("")
    const [distance, setDistance] = useState(0)
    const carbonKey = import.meta.env.VITE_CARBON_INTERFACE
    const estimateURL = import.meta.env.VITE_CARBON_ESTIMATE_URL
    const now = new Date();
    const [error, setError] = useState("")
    const errorFlag: ReactElement = <h3 className="text-red-500 text-xl font-bold">{error}</h3>

    useEffect(() => {
        const getVehicle = async () => {
            try {
                if (vehicleId) {
                    const ref = doc(db, 'vehicles', vehicleId)
                    const docSnap = await getDoc(ref)
                    const data = docSnap.data()
                    if (data) {
                        setVehicleInfo([data.year, data.make, data.model])
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }

        getVehicle()
    }, [])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'))
                const projectList: Project[] = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    projectList.push(new Project(doc.id, data.customerName, data.location))
                })
                
                setProjects(projectList)
            }
    
            catch (err) {
                console.log(err)
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        const fetchEstimate = async () => {
            if (distance <= 0) { return };
            if (!vehicleModelId) { return };

            const response = await fetch(estimateURL, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${carbonKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "vehicle",
                    distance_unit: "mi",
                    distance_value: distance,
                    vehicle_model_id: vehicleModelId
                })
            })

            const data = await response.json()
            setCarbonEstimate(`${data.data.attributes.carbon_lb} lbs`)
        }

        fetchEstimate()
    }, [distance, vehicleModelId, estimateURL, carbonKey])

    useEffect(() => {
        const fetchCheckouts = async () => {
            try {
                const checkoutQuery = query(
                    collection(db, 'checkouts'),
                    where("vehicleId", "==", vehicleId),
                    orderBy("startDate", "desc")
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
            } catch (err) {
                console.log(err)
            }
        }

        fetchCheckouts()
    }, [])

    let tripDetails;

    if (project) {
        tripDetails = 
        <div>
            <label htmlFor="bodyStyle" className="block text-sm font-medium">Select Project</label>
            <select name="project" id="project" className="mt-1 block w-full border rounded-md p-2" required>
                <option value="">--Please choose an option--</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.id}</option>
                ))}
            </select>
        </div>
    } else {
        tripDetails = 
        <div>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" className="mt-1 inline w-full border rounded-md p-2" maxLength={30} required />
        </div>
    }

    if (!user) {
        return(<h1>Not authenticated</h1>)
    }

    const checkout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        
        const projectValue = formData.get('project');

        const startDate = new Date(formData.get('startDate') as string).toISOString();
        const endDate = new Date(formData.get('endDate') as string).toISOString();
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)

        const isOverlapping = (start1: Date, end1: Date, start2: Date, end2: Date) => {
            return start1 < end2 && end1 > start2;
        };
          
        for (const checkout of checkouts) {
            const existingStart = new Date(checkout.startDate);
            const existingEnd = new Date(checkout.endDate);
            console.log(`Start Date OBJ: ${startDateObj}\nEnd Date OBJ: ${endDateObj}\nCheckout Start: ${existingStart}\n Checkout End: ${existingEnd}`)
        
            if (isOverlapping(startDateObj, endDateObj, existingStart, existingEnd)) {
                setError("Vehicle cannot be checked out during an existing checkout!!!");
                return;
            }
        }
        
        const checkoutData = {
            userId: user.sub,
            vehicleId: vehicleId,
            vehicleInfo: vehicleInfo,
            startDate: startDate,
            endDate: endDate,
            description: formData.get('description'),
            miles: formData.get('miles'),
            open: true,
            carbonEstimate: carbonEstimate,
            checkedIn: false,
        };
        
        if (projectValue && projectValue !== "") {
            Object.assign(checkoutData, { project: projectValue });
        }

        function makeId() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 10) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }
    
        try {
            await setDoc(doc(db, 'checkouts', makeId()), checkoutData);

            if (now >= startDateObj) {
                if (vehicleId) {
                    await setDoc(doc(db, 'vehicles', vehicleId), { available: false }, { merge: true });
                } else {
                    console.error("Vehicle ID is null");
                }
            }

            navigate('/my-trips');
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="check-out-container bg-white w-full max-w-md p-4 shadow-2xl rounded-2xl">
                <h1 className="text-4xl font-bold">Checkout Form</h1>
                <h2 className="text-2xl"><span className="font-bold">For: </span>{`${vehicleInfo[0]} ${vehicleInfo[1]} ${vehicleInfo[2]}`}</h2>
                {errorFlag}

                <form onSubmit={checkout} className="checkout-form [&>div]:my-5">
                    <div>
                        <label htmlFor="startDate" className="text-xl">Start Date</label>
                        <input type="datetime-local" name="startDate" id="startDate" className="mt-1 inline w-full border rounded-md p-2" required />
                    </div>

                    <div>
                        <label htmlFor="endDate" className="text-xl">End Date</label>
                        <input type="datetime-local" name="endDate" id="endDate" className="mt-1 inline w-full border rounded-md p-2" required />
                    </div>

                    <div>
                        <input type="checkbox" name="forProject" id="forProject" value="project" onChange={() => setProject(project === false)}/>
                        <label htmlFor="forProject" className="mx-2">For Project?</label>
                    </div>

                    {tripDetails}

                    <div>
                        <label htmlFor="miles">Estimated Trip Length (in miles)</label>
                        <input type="number" name="miles" id="miles" className="mt-1 inline w-full border rounded-md p-2" onChange={(e) => setDistance(Number(e.target.value))} required />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-700 text-white rounded">Submit</button>
                    </div>
                </form>
            </div>
            <CheckoutSchedule checkouts={checkouts}/>
        </div>
    )
}

export default CheckoutPage