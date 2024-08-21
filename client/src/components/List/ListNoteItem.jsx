import React, { useState, useRef, useEffect } from "react";
import { useNoteContext } from "../../Context/Context";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import noteService from "../../services/noteService";

export const ListNoteItem = ({
  item,
  setNote,
  note,
  forSingleNote,
  isCreating
}) => {

  const { setNotes } = useNoteContext();

  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.style.height = "0px";
  //     const scrollHeight = inputRef.current.scrollHeight;
  //     inputRef.current.style.height = scrollHeight + "px";
  //   }
  // }, [item.task]);

  const handleInputChange = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      listContent: prevNote.listContent.map((listItem) =>
        listItem.id === item.id
          ? { ...listItem, task: e.target.value }
          : listItem
      ),
    }));
  };

  const handleCheckboxChange = async (itemId) => {
    try {
      if (!note) {
        console.error("Error updating checkbox: Note not found.");
        return;
      }
      const updatedlistContent = note.listContent.map((listItem) =>
        listItem.id === itemId
          ? { ...listItem, isComplete: !listItem.isComplete }
          : listItem
      );

      if (!isCreating) {
        await noteService.updateNote(note._id, {
          listContent: updatedlistContent,
        });
          setNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
            prevNote._id === note._id ? { ...prevNote, listContent: updatedlistContent } : prevNote
          )
        );
      }
      if(forSingleNote || isCreating){
        setNote((prevNote) => ({
            ...prevNote,
            listContent: updatedlistContent,
          }));
      }
    } catch (error) {
      console.error("Error updating checkbox:", error);
    }
  };
  
  const handleDelete = async () => {
    const updatedListContent = note.listContent.filter(
      (listItem) => listItem.id !== item.id
    );    
    if (isCreating === false || isCreating === undefined) {
      await noteService.updateNote(note._id, {
        listContent: updatedListContent,
      });
      setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote._id === note._id ? { ...prevNote, listContent: updatedListContent } : prevNote
      )
    );
    }
    setNote((prevNote) => ({
      ...prevNote,
      listContent: updatedListContent,
    }));    
  };

  return (
    <div
      className={`icon-container border-t border-b border-solid ${
        isFocused ? " border-borderColor" : "border-transparent"
      }`}
    >
      <div className="flex py-5 pr-4 pl-6 w-full">
        <div>
          <div
            className="h-full w-full flex pt-0.5 text-textColor hover:opacity-100 opacity-60"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCheckboxChange(item.id);
            }}
          >
            {!item.isComplete ? (
              <MdCheckBoxOutlineBlank size={18} />
            ) : (
              <MdOutlineCheckBox size={18} />
            )}
          </div>
        </div>

        <div className="w-full flex items-start">
          <input
            ref={inputRef}
            className={`resize-none w-full max-w-md pl-3 bg-transparent outline-none font-normal break-words whitespace-pre-wrap ${
              item.isComplete ? "line-through" : "" } ${forSingleNote ? "text-base" : "text-sm"} `}
            value={item.task}
            readOnly={!forSingleNote && !isCreating}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent new line on Enter key
              }
            }}
          />
        </div>

        {(forSingleNote || isCreating) &&
            <RxCross2
            size={18}
            className={`cursor-pointer text-headerColor ${isFocused ? "" : "hover-icon"}`}
            onClick={handleDelete}
          />          
        }
      </div>
    </div>
  );
};
