import React, { useState, useEffect, useRef } from "react";
import { TbBellPlus } from "react-icons/tb";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  MdOutlinePhoto,
  MdOutlineArchive,
  MdOutlinePalette,
} from "react-icons/md";
import ColorPalette from "../PopOver/ColorPalette";
import { MoreSection } from "../PopOver/MoreSection";
import { useNoteContext } from "../../Context/Context.jsx";
import noteActions from "../../services/noteActions";
import noteService from "../../services/noteService";
import { usePopper } from "react-popper";
import { handleImageUpload } from "./ImageUpload.js";

function Icon({ note, setNote, noteData, setNoteData, isCreating, setSelectedFile}) {
  
  const ref = useRef()
  const { notes, setNotes } = useNoteContext();

  const [openPopover, setOpenPopover] = useState(null);
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();

  const getPopoverPlacement = () => {
    switch (openPopover) {
      case 'color':
        return 'bottom';
      default:
        return 'bottom-end';
    }
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: getPopoverPlacement(),
    strategy: 'fixed',
  });

  const handlePopoverToggle = (popoverType) => {
    setOpenPopover((prevPopover) => (prevPopover === popoverType ? null : popoverType));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target) ) {
        setOpenPopover(null)
      }
    } 
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [ref])
  
  
  const changeColor = (noteId, color) => {
    if(isCreating){
      setNoteData((prevNoteData) => ({ ...prevNoteData, backgroundColor: color }));
    }else{
      noteActions.changeNoteProperty(noteId, "backgroundColor", color, setNotes);
      if(setNote){
        setNote((prevNote) => ({ ...prevNote, backgroundColor: color }));
      }
    } 
  };

  const changeBackgroundImage = (noteId, image) => {
    if(isCreating){
      setNoteData((prevNoteData) => ({ ...prevNoteData, backgroundImage: image }));
    }else{
      noteActions.changeNoteProperty(noteId, "backgroundImage", image, setNotes);
    //for single note and createNote
      if(setNote){
        setNote((prevNote) => ({ ...prevNote, backgroundImage: image }));
      }
    } 
  };

  const changeArchive = async (noteId) => {
    try {
      const isArchive = !notes.find((note) => note._id === noteId)?.isArchive;
      await noteService.updateNote(noteId, { isArchive });
      const updatedNotes = notes.map((note) =>
        note._id === noteId ? { ...note, isArchive } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error toggling archive:", error);
    }
  };

  
  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); //Convert FileList to an array
    setSelectedFile(files);
    await handleImageUpload(files);
  };

  return (
    <div ref={ref} >
      <div  ref={setReferenceElement} className="opacity-80 h-8 w-full flex min-h-28">
       <div className="flex items-center justify-center w-8 mx-2 border border-solid border-transparent rounded-full hover:bg-hoverColor">
          <TbBellPlus size={18} />
        </div>
        <div
          onClick={() => handlePopoverToggle("color")}
          className="flex items-center justify-center mx-2 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor"
        >
          <MdOutlinePalette size={18} />
        </div>
        <div className="flex items-center justify-center mx-2 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor">
            <input multiple
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <MdOutlinePhoto size={18} onClick={handleIconClick}/>
        </div>
        
        <div
          onClick={() => changeArchive(note._id)}
          className="flex items-center justify-center mx-2 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor"
        >
          <MdOutlineArchive size={18} />
        </div>
        <div
          onClick={() => handlePopoverToggle("more")}
          className="flex items-center justify-center mx-2 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor"
        >
          <BiDotsVerticalRounded size={19} />
        </div>
      </div>
        {openPopover && (
          <div
            style={{ ...styles.popper, zIndex: 1000}}
            ref={setPopperElement}
            {...attributes.popper}
          >
            {openPopover === 'color' && (
              <ColorPalette note = {note} isCreating={isCreating} noteData={noteData} changeColor={changeColor} changeBackgroundImage={changeBackgroundImage} />
            )}
            {openPopover === 'more' && <MoreSection note={note} setNote={setNote} isCreating={isCreating} noteData={noteData} setNoteData={setNoteData}/>}
          </div>
        )}
    </div>
  );
}

export default Icon;