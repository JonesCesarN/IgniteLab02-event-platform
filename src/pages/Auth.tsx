import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sinInWithGithub } from "../firebase";


export const Auth = () => {
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    let dataAuth = {}

    if (user) {
      dataAuth = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      }
    }
    console.log(dataAuth)
  }, [user, loading, error])

  return (
    <div>Auth
      <button className="login__btn login__google" onClick={sinInWithGithub}>
        Login with Google
      </button>
    </div>
  )
}
