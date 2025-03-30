import LoginBtn from "../LoginBtn"

function LoginPage() {
    return (
        <div className="login-page flex flex-row min-h-screen justify-center items-center">
            <div className="login-content bg-white border-3 border-sky-700 w-[30%] text-center rounded-2xl shadow-2xl">
                <h1 className="text-6xl mb-10">You're not logged in!</h1>
                <p className="text-2xl mb-30">Please log in to access this applications resources</p>

                <LoginBtn />
            </div>
        </div>
    )
}

export default LoginPage