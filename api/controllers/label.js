import {Label} from "../models/labelModel.js";
import { Note } from "../models/noteModel.js";


// GET all labels
export const getAllLabels = async (req, res) => {
    try {
      const labels = await Label.find();
      res.status(200).json(labels);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // GET a single label by ID
  export const getLabelById = async (req, res) => {
    try {

      const label = await Label.findById(req.params.id);
      if (!label) {
        return res.status(404).json({ message: "Label not found" });
      }
      res.status(200).json(label);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Create a new label
export const createLabel = async (req, res) => {
  try {
    const { name } = req.body;
    console.log({name})
    // Check if label with the same name already exists
    const existingLabel = await Label.findOne({ name });

    if (existingLabel) {
      return res.status(400).json({ message: "Label with this name already exists" });
    }
    const newLabel = new Label({ name });
    const savedLabel = await newLabel.save();
    console.log(newLabel);

    res.status(201).json({ message: "Label created successfully", label: savedLabel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// PUT update a label by ID
export const updateLabel = async (req, res) => {
    try {
      const updatedLabel = await Label.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedLabel) {
        return res.status(404).json({ message: "Label not found" });
      }
      res.status(200).json(updatedLabel);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

//delete a label by ID
export const deleteLabel = async (req, res) => {
    try {
        const deleteLabel = await Label.findByIdAndDelete(req.params.id);
        if(!deleteLabel) {
            return res.status(404).json({ message: "Label not found" });
        }
        res.status(200).json({ message: "Label deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// find all notes associated with a specific label
// const notesWithLabel = await Note.find({ labels: labelId }).populate('labels');

// find all notes associated with a specific label
export const getNotesByLabelId = async (req, res) => {
  try {
      const labelId = req.params.id;

      // Step 1: Retrieve the label by ID
      const label = await Label.findById(labelId);
      if (!label) {
          return res.status(404).json({ message: "Label not found" });
      }
      // Step 2: Find all notes with the specified label
      const notesWithLabel = await Note.find({ labels: labelId }).populate('labels');

      res.status(200).json({ label, notes: notesWithLabel });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};