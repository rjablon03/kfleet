function Header() {
    return(
        <header className="flex bg-sky-700 justify-between">
            <h1 className="text-white text-4xl font-bold p-2">K-fleet</h1>

            <nav className="hidden lg:block text-white text-lg font-bold p-4">
                <ul className="flex gap-10">
                    <a href="">Home</a>
                    <a href="">My Trips</a>
                    <a href="">Vehicle Manager</a>
                    <a href="">Analytics</a>
                </ul>
            </nav>
        </header>
    )
}

export default Header