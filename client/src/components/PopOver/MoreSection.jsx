import React, { useState } from "react";
import axios from "axios";
import { useNoteContext } from "../../Context/Context";
import { usePopper } from "react-popper";
import { bottom } from "@popperjs/core";
import { AddLabel } from "./AddLabel";
import noteService from "../../services/noteService";

export const MoreSection = ({ note, setNote, isCreating, noteData, setNoteData }) => {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const [openLabel, setOpenLabel] = useState(false);

  const { notes, setNotes, selectedNote } = useNoteContext();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    // modifiers: [{ name: "arrow" }],
    placement: bottom,
    strategy: "fixed",
  });

  const handleOpen = () => {
    setOpenLabel(!openLabel);
  };

  const handleTrash = async (noteId) => {
    try {
      await noteService.updateNote(noteId, {
        isDeleted: true,
      });
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote._id === noteId ? { ...prevNote, isDeleted: true } : prevNote
        )
      );
      console.log("Note Deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  
  const items = [
    { name: "Delete", onClick: () => handleTrash(selectedNote._id)},
    { name: "Add Label", onClick: handleOpen },
    { name: "Add Drawing" },
    { name: "Make a copy" },
  ];

  return (
    <>
      <div
        ref={referenceElement}
        className=" bg-slate-50 z-4001 shadow-2xl rounded"
      >
        <div className="py-1.5 w-40 text-label font-custom">
          {items.map((item, index) => (
            <div
              key={index}
              className="py-1.5 pl-4 pr-2.5 border-transparent text-15 leading-5 font-normal cursor-pointer hover:bg-gray-200 "
              onClick={() => item.onClick()}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {openLabel && (
        <div
          style={{ ...styles.popper, zIndex: 1000 }}
          ref={setPopperElement}
          {...attributes.popper}
        >
          <AddLabel note={note} setNote={setNote} isCreating={isCreating} noteData={noteData} setNoteData={setNoteData}/>
        </div>
      )}
    </>
  );
};
