import { useAuth0 } from "@auth0/auth0-react"

function LogoutBtn() {
    const { logout } = useAuth0();

    return (
        <button className="bg-white text-sky-700 w-30 rounded-xl" onClick={() => logout(
            { logoutParams: { returnTo: window.location.origin }
        })}>Log Out</button>
    )
}

export default LogoutBtn