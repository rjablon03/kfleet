function Header() {
    return(
        <div className="header bg-sky-700 p-3 flex justify-between">
            <h1 className="text-5xl font-bold text-stone-50">K-fleet</h1>
            <nav>
                <ul className="flex text-xl p-3 w-3xl justify-evenly text-stone-50">
                    <li><a href="">Home</a></li>
                    <li><a href="">My Trips</a></li>
                    <li><a href="">Manager</a></li>
                    <li><a href="">Analytics</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header