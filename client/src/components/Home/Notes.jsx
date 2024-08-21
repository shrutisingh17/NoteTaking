import React from "react";

import CreateNote from "./CreateNote";
import { useNoteContext } from "../../Context/Context";
import MasonryGrid from "../MasonryGrid";

const Notes = () => {
  const { notes, setNotes } = useNoteContext();
  const pinnedNotes = notes?.filter((note) => note.isPinned && !note.isArchive && !note.isDeleted);
  const otherNotes = notes?.filter((note) => !note.isPinned && !note.isArchive && !note.isDeleted);

  return (
    
      <div className="items-center justify-center">
        <div>
          <CreateNote setNotes={setNotes} notes={notes} />
        </div>
        <div className="w-full mx-auto max-w-3xl">
            <div className="mx-8 mt-8 mb-2 text-pinnedColor uppercase text-xs font-medium tracking-widest">
              PINNED
            </div>
            <MasonryGrid notes={pinnedNotes} />
            <div className="mx-8 mt-8 mb-2 text-pinnedColor uppercase text-xs font-medium tracking-widest">
              OTHERS
            </div>
            <MasonryGrid notes={otherNotes} />
        </div>
      </div>
  );
};

export default Notes;
