import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { auth, logout } from "../firebase";

export const Event = () => {
  const { slug } = useParams<{ slug: string }>()

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [screen, setScreen] = useState<number>(0)
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  if (!user && !loading) navigate('/')

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setScreen(width)
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <button onClick={() => logout()}>logout</button>

      <main className="flex flex-1 flex-col lg:flex-row">
        {slug
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" />
        }
        <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} slug={slug} screen={screen} />

      </main>
    </div>
  );
};
