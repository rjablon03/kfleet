import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, X } from "lucide-react";

function Header() {
    const [employeeRole, setEmployeeRole] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.sub) {
                const employeeDocRef = doc(db, "employees", user.sub);
                const employeeSnap = await getDoc(employeeDocRef);
                const data = employeeSnap.data();
                setEmployeeRole(data?.role || "");
            } else {
                setEmployeeRole("");
                console.error("Error: User ID is undefined");
            }
        };

        fetchRole();
    }, [user]);

    return (
        <header className="flex items-center justify-between bg-sky-700 text-white p-4 sticky top-0 z-50">
            <Link to="/">
                <h1 className="text-3xl font-bold">K-fleet</h1>
            </Link>

            <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <nav className="hidden lg:block">
                <ul className="flex gap-10 text-lg font-semibold">
                    <Link to="/">Home</Link>
                    <Link to="/my-trips">My Trips</Link>
                    {employeeRole === "Admin" && (
                        <>
                            <Link to="/vehicle-manager" className="hidden lg:block">Vehicle Manager</Link>
                            <Link to="/analytics" className="hidden lg:block">Analytics</Link>
                        </>
                    )}
                    <LogoutBtn />
                </ul>
            </nav>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-sky-800 text-white flex flex-col gap-4 p-6 shadow-lg lg:hidden">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/my-trips" onClick={() => setIsMenuOpen(false)}>My Trips</Link>
                    {employeeRole === "Admin" && (
                        <>
                            <Link to="/vehicle-manager" className="hidden lg:block" onClick={() => setIsMenuOpen(false)}>Vehicle Manager</Link>
                            <Link to="/analytics" className="hidden lg:block" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
                        </>
                    )}
                    <LogoutBtn />
                </div>
            )}
        </header>
    );
}

export default Header;