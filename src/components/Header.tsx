import { Link } from "react-router"
import LogoutBtn from "./LogoutBtn"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { useAuth0 } from "@auth0/auth0-react"

function Header() {
    const [employeeRole, setEmployeeRole] = useState("")
    const { user } = useAuth0()

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.sub) {
                const employeeDocRef = doc(db, 'employees', user.sub);
                const employeeSnap = await getDoc(employeeDocRef);
                const data = employeeSnap.data()
                setEmployeeRole(data.role)
            } else {
                console.error("Error: User ID is undefined");
            }
        }

        fetchRole()
    }, [])

    return(
        <header className="flex bg-sky-700 justify-between sticky top-0">
            <Link to="/"><h1 className="text-white text-4xl font-bold p-2">K-fleet</h1></Link>
            <p className="md:hidden">Mobile</p>
            <p className="hidden md:block lg:hidden">Tablet</p>
            <p className="hidden lg:block xl:hidden">Desktop</p>
            <p className="hidden xl:block">Larger</p>

            <nav className="hidden lg:block text-white text-lg font-bold p-4">
                <ul className="flex gap-10">
                    <Link to="/">Home</Link>
                    <Link to="/my-trips">My Trips</Link>
                    {employeeRole === "Admin" ? <Link to="/vehicle-manager">Vehicle Manager</Link> : null}
                    {employeeRole === "Admin" ? <Link to="/analytics">Analytics</Link> : null}
                    <LogoutBtn />
                </ul>
            </nav>
        </header>
    )
}

export default Header