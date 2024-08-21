import {Note} from "../models/noteModel.js";
import multer from "multer";
import path from "path";

// GET all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new note
export const createNote = async (req, res) => {
  const {
    title,
    content,
    listContent,
    backgroundColor,
    backgroundImage,
    isPinned,
    isArchive,
    labels,
    image_url,
    // drawing_data,
    // reminder_datetime,
  } = req.body;

  const newNote = new Note({
    title,
    content,
    listContent,
    backgroundColor,
    backgroundImage,
    isPinned,
    isArchive,
    labels,
    image_url
  });

  console.log("New Note:", newNote);

  try {
    const savedNote = await newNote.save();
    console.log("Note Saved:", savedNote);
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    console.error("Error during save:", error);
    res.status(500).json({ message: "Failed to create note", error });
  }
};

// PUT update a note by ID
export const updateNote = async (req, res) => {
  //  const { id } = req.params;
  try {
    // Check if the request body includes the 'isDeleted' property
    if (req.body.isDeleted) {
      req.body.deletedAt = Date.now();
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Run validators to ensure data integrity
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a note by ID
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLabelsByNoteId = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Step 1: Retrieve the note by ID
    const note = await Note.findById(noteId).populate('labels');

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ note, labels: note.labels });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Serach
export const search = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
     const regex = new RegExp(query, 'i');
     const searchResults = await Note.find({
       $or: [
         { title: regex },
         { content: regex },
        //  { labels: { $in: [regex.toString()] } }, // Convert the regex to a string
      ],
     });
     res.status(200).json({ results: searchResults }); 
    } catch (err ) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE all notes in the trash
export const deleteAllNotesInTrash = async (req, res) => {
  try {
    const notesInTrash = await Note.find({ isDeleted: true });
    if (notesInTrash.length === 0) {
      return res.status(404).json({ message: 'No notes found in the trash' });
    }
    await Note.deleteMany({ isDeleted: true });
    res.status(200).json({ message: 'All notes in the trash have been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Background process to permanently delete notes from trash after 7 days
export const scheduleTrashDeletion = () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  Note.deleteMany({ deleted: true, deletedAt: { $lt: sevenDaysAgo } })
    .then((result) => {
      console.log(`${result.deletedCount} notes permanently deleted from trash.`);
    })
    .catch((error) => {
      console.error('Error deleting notes from trash:', error);
    });
};

// Schedule the trash deletion job to run every day
setInterval(scheduleTrashDeletion, 24 * 60 * 60 * 1000); // Run every 24 hours



// const PORT = process.env.PORT || 3000;
// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/Images'); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Define the filename for uploaded files
//   }
// });

// // Initialize multer upload
// const upload = multer({storage: storage });

// // Route to handle image uploads
// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const imageUrl = `http://localhost:${PORT}/Images/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };