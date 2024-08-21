import React from "react";
import { MdDeleteForever, MdRestoreFromTrash } from "react-icons/md";
import { useNoteContext } from "../../Context/Context";
import axios from "axios";
import noteService from "../../services/noteService";

export const TrashFooter = ({ note }) => {
  const { setNotes } = useNoteContext();

  const handleDelete = async (noteId) => {
    axios.defaults.withCredentials = true;
    try {
      await axios.delete(`http://localhost:8800/api/notes/${noteId}`);
      console.log("Note Deleted successfully");
      setNotes((prevNotes) =>
        prevNotes.filter((prevNote) => prevNote._id !== noteId)
      );
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleRestore = async (noteId) => {
    try {
      await noteService.updateNote(noteId, {
        isDeleted: false,
      });
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote._id === noteId ? { ...prevNote, isDeleted: false } : prevNote
        )
      );
      console.log("Note Restored successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="opacity-80 h-8 w-full flex min-h-28">
      <div
        className="flex items-center justify-center w-8 mx-2 border border-solid border-transparent rounded-full hover:bg-hoverColor"
        onClick={() => handleDelete(note._id)}
      >
        <MdDeleteForever size={18} />
      </div>
      <div
        className="flex items-center justify-center w-8 mx-2 border border-solid border-transparent rounded-full hover:bg-hoverColor"
        onClick={() => handleRestore(note._id)}
      >
        <MdRestoreFromTrash size={18} />
      </div>
    </div>
  );
};
