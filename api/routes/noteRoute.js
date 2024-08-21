import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getLabelsByNoteId,
  search,
  deleteAllNotesInTrash,
  // uploadImage
} from '../controllers/note.js';

const router = express.Router();

// GET all notes
router.get('/', getAllNotes);

// GET a single note by ID
router.get('/search', search);

router.get('/:id', getNoteById);

// router.post('/upload', uploadImage)


// POST create a new note
router.post('/', createNote);

// PUT update a note by ID
router.put('/:id', updateNote);

// DELETE a note by ID
router.delete('/trash', deleteAllNotesInTrash);
router.delete('/:id', deleteNote);

// Corrected route path
router.get('/labels/:id', getLabelsByNoteId);

export default router;
