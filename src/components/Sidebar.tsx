import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import classNames from 'classnames'
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface SidebarProps {
  isNavOpen: boolean,
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
  slug?: string,
  screen: number
}

export const Sidebar = ({ isNavOpen, setIsNavOpen, slug, screen }: SidebarProps) => {
  const { data } = useGetLessonsQuery()
  const [user, loading, error] = useAuthState(auth)
  console.log(user)
  const navigation = useNavigate()
  if (data) {
    let slugLast = data.lessons[0].slug
    if (!slug) navigation('/event/lesson/' + slugLast)

  }

  return (
    <aside className={classNames("bg-gray-700 pb-6 pl-6 pr-6 border-l border-gray-600 ", {
      "w-[348px] transition-all hidden": !isNavOpen && screen < 1024,
      "w-full md:w-fit absolute z-50 top-18 right-0 h-full transition-all": isNavOpen && screen < 1024,
      "w-[348px]": screen > 1023
    })}>
      <nav className="py-3 flex justify-between items-center border-b border-gray-500 mb-[10px]">
        <div className="flex items-center gap-1">
          <img
            className="w-[30px] rounded-[50%]"
            src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=740'}
            alt="profile"
          />
          <p className="text-[14px]">{user?.displayName}</p>
        </div>
        <button
          onClick={() => logout()}
          className="bg-blue-500 text-black py-1 px-5 rounded"
        >
          logout
        </button>
      </nav>
      <span className="font-bold text-2xl pb-3 text-center mb-3 border-b border-gray-500 block">Cronograma de aulas</span>

      <div className="flex flex-col gap-8">

        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
              setIsNavOpen={setIsNavOpen}
            />
          )
        })}

      </div>
    </aside>
  );
};
