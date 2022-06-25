import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import classNames from 'classnames'

interface SidebarProps {
  isNavOpen: boolean,
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({ isNavOpen, setIsNavOpen }: SidebarProps) => {
  const { data } = useGetLessonsQuery()

  return (
    <aside className={classNames("bg-gray-700 p-6 border-l border-gray-600", {
      "w-[348px]": !isNavOpen,
      "w-full md:w-fit absolute z-50 top-18 right-0 h-full": isNavOpen
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
