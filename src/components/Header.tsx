import { Dispatch, SetStateAction } from "react";
import { Logo } from "./Logo";
import classNames from 'classnames'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
  isNavOpen: boolean,
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
}

export const Header = ({ isNavOpen, setIsNavOpen }: HeaderProps) => {

  return (
    <header className={classNames(" w-full py-5 px-6 flex items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600", {

    })}>
      <Logo width="167" />
      <nav className="flex items-center gap-3 lg:hidden">
        <span className="text-sm">Aulas</span>
        <button className={!isNavOpen ? 'flex' : 'hidden'}>
          <FontAwesomeIcon icon={faBars}
            className="text-2xl animate-pulse text-blue-500"
            onClick={() => setIsNavOpen((prev) => !prev)}
          />
        </button>
        <button className={isNavOpen ? 'flex' : 'hidden'}>
          <FontAwesomeIcon icon={faXmark}
            className="text-2xl text-blue-500"
            onClick={() => setIsNavOpen(false)}
          />
        </button>

      </nav>
    </header>
  );
};
