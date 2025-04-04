import { db } from "../../config/firebase"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getDocs, collection } from "firebase/firestore"
import { Project } from "../../models/Project"

function CheckoutPage() {
    const { id } = useParams()
    const { user } = useAuth0()
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([])

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

    if (!id) {
        return (<h1>There was an error loading this page</h1>)
    }

    if (!user) {
        return(<h1>Not authenticated</h1>)
    }

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className="check-out-container bg-white w-[40%] p-4 shadow-2xl rounded-2xl">
            <h1 className="text-4xl font-bold">Checkout Form</h1>
            <h2 className="text-2xl"><span className="font-bold">For: </span>2025 Honda Civic</h2>

            <form action="" className="checkout-form">
                <div>
                    <label htmlFor="startDate" className="block text-xl">Start Date</label>
                    <input type="datetime" name="startDate" id="startDate" className="mt-1 block w-full border rounded-md p-2" />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-xl">End Date</label>
                    <input type="datetime" name="endDate" id="endDate" className="mt-1 block w-full border rounded-md p-2" />
                </div>

                <div>
                    <label htmlFor="forProject">Project</label>
                    <input type="radio" name="forProject" id="forProject" value="project" />
                    <label htmlFor="other">Other</label>
                    <input type="radio" name="other" id="other" value="other" />
                </div>

                <div>
                    <label htmlFor="project">Project</label>
                    <select name="project" id="project">
                        <option value="">--Please choose an option--</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>{project.id}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button onClick={handleClose}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutPage