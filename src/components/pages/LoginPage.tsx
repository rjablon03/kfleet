import LoginBtn from "../LoginBtn"

function LoginPage() {
    return (
        <div className="login-page flex flex-row min-h-screen justify-center items-center">
            <div className="login-content bg-white border-3 border-sky-700 w-[70%] text-center rounded-2xl shadow-2xl md:w-[40%]">
                <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-5">Welcome to K-fleet!</h1>
                <p className="text-2xl my-5">Please Log In</p>

                <LoginBtn />
            </div>
        </div>
    )
}

export default LoginPage