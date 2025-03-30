import { useAuth0 } from "@auth0/auth0-react";

function LoginBtn() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button className="mb-15 text-2xl p-2 w-30 bg-sky-700 text-white rounded-lg" onClick={() => loginWithRedirect()}>Log In</button>
    )
}

export default LoginBtn;