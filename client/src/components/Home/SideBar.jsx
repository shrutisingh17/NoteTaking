import React, { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { LuPencil } from "react-icons/lu";
import { MdOutlineLightbulb, MdOutlineArchive } from "react-icons/md";
import { FaRegBell ,FaRegTrashAlt } from "react-icons/fa";

import { EditLabels } from "./EditLabels";
import { useNoteContext } from "../../Context/Context";
import { HiOutlineHashtag } from "react-icons/hi";


const SidebarContext = createContext({ expanded: false });

const SideBar = ({ expanded, setExpanded }) => {
  const [hovered, setHovered] = useState(false);
  const [isEditLabelsVisible, setEditLabelsVisible] = useState(false);
  const { noteLabels } = useNoteContext();

  const handleLabel = () => {
    setEditLabelsVisible(true);
  }

  const navList = [
    { id: 1, name: 'Notes', icon: <MdOutlineLightbulb size={25} />, route: '/'},
    { id: 2, name: 'Reminders', icon: <FaRegBell size={20} />, route: '/reminders' },
    { id: 3, name: 'Edit labels', icon: <LuPencil size={21} />, onClick: handleLabel,},
    ...noteLabels.map((label) => ({
      id: label._id, 
      name: label.name,
      icon: <HiOutlineHashtag size={21} />,
      route: `/label/${label._id}`
    })),
    { id: 5, name: 'Archive', icon: <MdOutlineArchive size={21} />, route: '/archive'},
    { id: 6, name: 'Trash', icon: <FaRegTrashAlt size={19} />, route: '/trash'},
  ];

  const handleIconHover = () => {
    if (expanded) {
      setExpanded(false);
      setHovered(true);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (hovered == true && expanded == false) {
      setExpanded(true);
      setHovered(false);
    }
  };

  return (
    <>
      <aside
        onMouseEnter={handleIconHover}
        onMouseLeave={handleSidebarMouseLeave}
        className={`h-full ${!expanded ? "w-72" : "w-20"}
        left-0 pt-2 text-sm font-medium tracking-wide`}
      >
        <SidebarContext.Provider value={{ expanded }}>
          {navList.map(({ id, name, icon, onClick, route }) => (
            <SideBarItems key={id} icon={icon} text={name} onClick={onClick} route={route} />
          ))}
        </SidebarContext.Provider>
      </aside>
      {isEditLabelsVisible  && (
        <>
        <div
          className="fixed top-0 left-0 w-full h-screen bg-textColor opacity-60 z-10"
          onClick={() => setEditLabelsVisible(false)}
        ></div>
        <EditLabels setEditLabelsVisible={setEditLabelsVisible} />
        </>
      )} 
    </>
  );
};


const SideBarItems = ({ icon, text, onClick, route }) => {
  const { expanded } = useContext(SidebarContext);
  const { pathname } = useLocation();
  const isActive = pathname === route && route !== undefined;

  return (
    <Link to={route}>
      <li
        className={`relative border border-transparent flex items-center h-12 pl-3 pr-1
        rounded-md cursor-pointer
        transition-colors group
        ${
          isActive 
            ? "bg-customYellow rounded-r-full"
            : "hover:bg-hoverColor rounded-r-full transition duration-300 ease-in-out"
        } 
        `}
        onClick={onClick}
      >
        <div
          className={`m-0 px-3
                ${
                  isActive 
                    ? "text-textColor rounded-full bg-cusroutemYellow"
                    : "text-iconColor"
                } `}
        >
          {icon}
        </div>
        <span
          className={` text-textColor overflow-hidden  whitespace-nowrap overflow-ellipsis transition-all ${
            !expanded ? "ml-5" : "w-0 ml-0"
          }`}
        >
          {text}
        </span>
      </li>
    </Link>
  );
};

export default SideBar;