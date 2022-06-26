import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sinInWithGithub } from "../firebase";
import { FaGithub } from 'react-icons/fa'

export const AuthGithub = ({ className }: any) => {
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
    <button className={className} onClick={sinInWithGithub}>
      <FaGithub />
      Sign in with GitHub
    </button>
  )
}
