import { Link } from "react-router"

function Header() {
    return(
        <header className="flex bg-sky-700 justify-between">
            <Link to="/"><h1 className="text-white text-4xl font-bold p-2">K-fleet</h1></Link>

            <nav className="hidden lg:block text-white text-lg font-bold p-4">
                <ul className="flex gap-10">
                    <Link to="/">Home</Link>
                    <Link to="/">My Trips</Link>
                    <Link to="/vehicle-manager">Vehicle Manager</Link>
                    <Link to="/">Analytics</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header