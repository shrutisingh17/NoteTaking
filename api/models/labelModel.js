import mongoose from 'mongoose';


const LabelSchema = mongoose.Schema({
  name: {
    type: String,
     required: true,
  }
});

export const Label = mongoose.model('Label', LabelSchema);