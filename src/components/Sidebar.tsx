import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import classNames from 'classnames'
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isNavOpen: boolean,
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
  slug?: string,
  screen: number
}

export const Sidebar = ({ isNavOpen, setIsNavOpen, slug, screen }: SidebarProps) => {
  const { data } = useGetLessonsQuery()
  const navigation = useNavigate()
  if (data) {
    let slugLast = data.lessons[0].slug
    if (!slug) navigation('/event/lesson/' + slugLast)

  }


  return (
    <aside className={classNames("bg-gray-700 p-6 border-l border-gray-600 lg:block", {
      "w-[348px] transition-all hidden": !isNavOpen && screen < 1024,
      "w-full md:w-fit absolute z-50 top-18 right-0 h-full transition-all": isNavOpen && screen < 1024
    })}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">Cronograma de aulas</span>

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
