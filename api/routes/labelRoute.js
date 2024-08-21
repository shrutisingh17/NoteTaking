import express from 'express';
import {
  createLabel,
  updateLabel,
  deleteLabel,
  getAllLabels,
  getLabelById,
  getNotesByLabelId,
} from '../controllers/label.js';

const router = express.Router();

router.get('/', getAllLabels);
router.get('/:id', getLabelById);
router.post('/', createLabel);
router.put('/:id', updateLabel);
router.delete('/:id', deleteLabel);
router.get('/notes/:id', getNotesByLabelId);


export default router;