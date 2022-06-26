import { FormEvent, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sinInWithGithub } from "../firebase";
import { FaGithub } from 'react-icons/fa'

export const AuthGithub = ({ className }: any) => {
  const [user, loading, error] = useAuthState(auth)

  async function handleAuthGithub(e: FormEvent) {
    const result = await sinInWithGithub(e)
    if (result?.toString().includes('auth/popup-closed-by-user')) {
      return console.log('Popup fechado')
    }

    if (result?.toString().includes('auth/user-cancelled')) {
      return console.log('Auth cancelado')
    }

  }

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
    console.log({ dataAuth, loading, error })
  }, [user, loading, error])

  return (
    <button className={className} onClick={handleAuthGithub}>
      <FaGithub />
      Entre com o GitHub
    </button>
  )
}
