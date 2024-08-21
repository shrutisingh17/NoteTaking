import React from "react";
import { NoteSection } from "../components/NoteSection";
import MasonryGrid from "../components/MasonryGrid";
import { useNoteContext } from "../Context/Context";

export const Archive = () => {
  const { notes } = useNoteContext();
  const archiveNotes = notes?.filter((note) => note.isArchive);

  return (
    // <div className="flex flex-col">
      <div className="w-full mx-auto ">
        <MasonryGrid notes={archiveNotes} />
      </div>
    // </div>
  );
};

