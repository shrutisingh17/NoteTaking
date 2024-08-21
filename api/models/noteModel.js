import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  
  listContent: [
    {
      id: {
        type: String,
        // required: true,
      },
      task: {
        type: String,
        // required: true,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
    },
  ],

  backgroundColor: {
    type: String,
    default: '#FFFFFF',
  },
  backgroundImage: {
    type: String,
  },
  // image_url: {
  //   type: String,
  // },
  image_urls: [{
    type: String,
  }],
  // drawing_data: {
  //   type: String,
  // },
  // reminder_datetime: {
  //   type: Date,
  // },
  
  isPinned: {
    type: Boolean,
    default: false,
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
  labels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label', // Reference to the Label model
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});


export const Note = mongoose.model("Note", NoteSchema);
