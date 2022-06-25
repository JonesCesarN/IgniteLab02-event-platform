import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";


export const Event = () => {
  const { slug } = useParams<{ slug: string }>()

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [screen, setScreen] = useState<number>(0)

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setScreen(width)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <main className="flex flex-1 flex-col lg:flex-row">
        {slug
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" />
        }
        {screen > 1023 && <Sidebar />}

      </main>
    </div>
  );
};
