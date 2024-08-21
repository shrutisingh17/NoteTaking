import React from "react";
import MasonryGrid from "../components/MasonryGrid";
import { useNoteContext } from "../Context/Context";
import axios from "axios";

export const Trash = () => {
  const { notes, setNotes } = useNoteContext();
  const trashNotes = notes?.filter((note) => note.isDeleted);

  const handleEmptyTrash = async () => {
    try {
      await axios.delete("http://localhost:8800/api/notes/trash");
      console.log("Trash emptied successfully");
      setNotes((prevNotes) =>
        prevNotes.filter((prevNote) => !prevNote.isDeleted)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full mx-auto ">
      <div className="w-full flex justify-center items-center pt-6 pb-2 font-custom">
        <p className="italic text-base">
          Notes in Trash are deleted after 7 days.
        </p>
        <div
          className="h-9 ml-4 px-6 py-2 text-sm tracking-wide text-blue-700 font-medium rounded cursor-pointer hover:bg-blue-50"
          onClick={handleEmptyTrash}
        >
          Empty Trash
        </div>
      </div>
      <MasonryGrid notes={trashNotes} />
    </div>
  );
};
