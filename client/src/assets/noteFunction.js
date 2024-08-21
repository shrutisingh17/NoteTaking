// noteFunctions.js
import axios from "axios";

export const updateNote = async (noteId, updatedData) => {
  try {
    await axios.put(`http://localhost:8800/api/notes/${noteId}`, updatedData);
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const changeArchive = async (noteId, notes, setNotes) => {
  try {
    const isArchive = !notes.find((note) => note._id === noteId)?.isArchive;
    await updateNote(noteId, { isArchive });

    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, isArchive } : note
    );
    setNotes(updatedNotes);
  } catch (error) {
    console.error("Error toggling archive:", error);
  }
};

export const changeColor = async (color, noteId, notes, setNotes) => {
  try {
    await updateNote(noteId, { backgroundColor: color });

    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, backgroundColor: color } : note
    );
    setNotes(updatedNotes);
  } catch (error) {
    console.error("Error updating note color:", error);
  }
};

export const updatePin = async (noteId, notes, setNotes) => {
  try {
    const isPinned = !notes.find((note) => note._id === noteId)?.isPinned;
    await updateNote(noteId, { isPinned });

    const updatedNotes = notes.map((note) =>
      note._id === noteId ? { ...note, isPinned } : note
    );
    setNotes(updatedNotes);
  } catch (error) {
    console.error("Error toggling pin:", error);
  }
};

export const handleCheckboxChange = (noteId, itemId, notes, setNotes) => {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note._id === noteId && note.listContent
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
};



// const updateNote = async (noteId, updatedData) => {
//     try {
//       await axios.put(`http://localhost:8800/api/notes/${noteId}`, updatedData);
//     } catch (error) {
//       console.error("Error updating note:", error);
//       throw error;
//     }
//   };
//   const changeArchive = async (noteId) => {
//     try {
//       const isArchive = !notes.find((note) => note._id === noteId)?.isArchive;
//       await updateNote(noteId, { isArchive });
//       console.log("hi");
//       const updatedNotes = notes.map((note) =>
//         note._id === noteId ? { ...note, isArchive } : note
//       );
//       setNotes(updatedNotes);
//     } catch (error) {
//       console.error("Error toggling archive:", error);
//     }
//   };

//   const changeColor = async (color, noteId) => {
//     try {
//       await updateNote(noteId, { backgroundColor: color });
//       setNotes((prevNotes) =>
//         prevNotes.map((note) =>
//           note._id === noteId ? { ...note, backgroundColor: color } : note
//         )
//       );
//     } catch (error) {
//       console.error("Error updating note color:", error);
//     }
//   };

//   const updatePin = async (noteId) => {
//     try {
//       // Find the note in the existing notes
//       const isPinned = !notes.find((note) => note._id === noteId)?.isPinned;

//       // Update the note in the database
//       await updateNote(noteId, { isPinned });

//       // Update the UI state
//       const updatedNotes = notes.map((note) =>
//         note._id === noteId ? { ...note, isPinned } : note
//       );
//       setNotes(updatedNotes);
//     } catch (error) {
//       console.error("Error toggling pin:", error);
//     }
//   };

//   const handleCheckboxChange = (noteId, itemId) => {
//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note._id === noteId && note.listContent
//           ? {
//               ...note,
//               listContent: note.listContent.map((item) =>
//                 item.id === itemId
//                   ? { ...item, isComplete: !item.isComplete }
//                   : item
//               ),
//             }
//           : note
//       )
//     );
//   };