
import React, { useEffect, useState } from "react";
import { TbPinned } from "react-icons/tb";
import Icon from "./NoteFooter/Icon";
import { ListContent } from "./List/ListContent";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useNoteContext } from "../Context/Context";
import noteActions from "../services/noteActions";
import { Labels } from "./Labels";
import { TrashFooter } from "./NoteFooter/TrashFooter";
import { AddImage } from "./AddImage";

export const NoteSection = ({ note }) => {
  
  const { notes, setNotes, selectedNote, setSelectedNote } = useNoteContext();
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState([]);

  const handlePinClick = () => {
    noteActions.updatePin(setNotes, note);
  };

  // console.log(note);

  return (
    <div 
    onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative">
      
    <div
      onClick={() => setSelectedNote(note)}
      style={{ backgroundColor: note.backgroundColor }}
      className="group relative w-60 h-auto m-4 text-textColor text-base rounded-lg hover:shadow-custom"
    >
      <div
        style={{ backgroundImage: `url(${note.backgroundImage})`, backgroundSize: "cover", backgroundPosition: 'right bottom'}}
        className="border border-gray-200 rounded-lg  overflow-x-hidden overflow-y-hidden"
      >
        <div className="hidden group-hover:block">
        {/* */}
          <div
            className="absolute top-2 right-3 opacity-80  flex items-center justify-center h-8 w-8 border border-transparent rounded-full hover:bg-hoverColor"
            onClick={handlePinClick}
          >
            <TbPinned size={24} fill={note?.isPinned ? "black" : "white"} />
          </div>
        </div>
        <Link
          className="frontpage-job"
          to={`/note/${note._id}`}
          state={{ previousLocation: location }}
        >
          <AddImage selectedFile={selectedFile}/>
          <div className=" min-h-noteMinH">
            <div className="pt-3 px-4 min-h-titleMinH font-medium text-lg tracking-wide break-words">
              {note.title}
            </div>
            <div>
              <div className="my-3 font-custom whitespace-pre-wrap">
                {!note.content ? (
                  <div className="">
                    <ListContent note={note} />
                  </div>
                ) : (
                  <div className="px-4 line-clamp-16 font-normal text-sm tracking-0.2 ">{note.content}</div>
                )}
              </div>
            </div>
          </div>
        </Link>
        <div className="px-2.5 py-1.5 flex items-center flex-wrap font-custom">
          <Labels note={note}  />
        </div>
        <div className="h-9 my-1 w-full flex items-center">
          <div>
            {(selectedNote?._id === note._id || isHovered) && (
              note.isDeleted ? (
                <TrashFooter note={note} />
              ) : (
                <Icon note={note} setSelectedFile={setSelectedFile}/>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};