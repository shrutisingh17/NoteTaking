// noteActions.js

import noteService from "./noteService";

const noteActions = {

  updatePin: async (setNotes, currentNote) => {
    try {
      if (currentNote) {
        const updatedIsPinned = !currentNote.isPinned;

        await noteService.updateNote(currentNote._id, {
          isPinned: updatedIsPinned,
        });
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentNote._id
              ? { ...note, isPinned: !note.isPinned }
              : note
          )
        );
      } else {
        console.error("Error updating note pin: Note not found.");
      }
    } catch (error) {
      console.error("Error updating note pin:", error);
      throw error;
    }
  },

  changeColor: async (noteId, color, setNotes) => {
    try {
      await noteService.updateNote(noteId, { backgroundColor: color });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, backgroundColor: color } : note
        )
      );
    } catch (error) {
      console.error("Error updating note color:", error);
      throw error;
    }
  },

  changeNoteProperty: async (noteId, property, value, setNotes) => {
    try {
      await noteService.updateNote(noteId, { [property]: value });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, [property]: value } : note
        )
      );
    } catch (error) {
      console.error(`Error updating note ${property}:`, error);
      throw error;
    }
  },

  changeImage: async (noteId, image, setNotes) => {
    try {
      await noteService.updateNote(noteId, { backgroundColor: color });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, backgroundColor: color } : note
        )
      );
    } catch (error) {
      console.error("Error updating note color:", error);
      throw error;
    }
  },
  // changeLabel: async ()

  handleCheckboxChange: async (itemId, setNotes, currentNote) => {
   
    try {
      if (currentNote) {
        const updatedlistContent = currentNote.listContent.map((item) =>
          item.id === itemId ? { ...item, isComplete: !item.isComplete } : item
        );
        await noteService.updateNote(currentNote._id, {
          listContent: updatedlistContent,
        });
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentNote._id && note.listContent
              ? {
                  ...note,
                  listContent: note.listContent.map((item) =>
                    item.id === itemId
                      ? { ...item, isComplete: !item.isComplete }
                      : item
                  ),
                }
              : note
          )
        );
      } else {
        console.error("Error updating checkbox: Note not found.");
      }
    } catch (error) {
      console.error(`Error updating note :`, error);
      throw error;
    }
  },
};

export default noteActions;
