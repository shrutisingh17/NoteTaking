import React from "react";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useNoteContext } from "../../Context/Context";
import noteService from "../../services/noteService";

export const AddLabel = ({ note, setNote, isCreating, noteData, setNoteData}) => {
  const { setNotes, noteLabels } = useNoteContext();

  const handleLabelNote = async (labelId, labelName) => {
    let updatedLabels;

    if (isCreating) {
      // For creating a new note
      updatedLabels = noteData.labels.some((label) => label._id === labelId)
        ? noteData.labels.filter((item) => item._id !== labelId)
        : [...noteData.labels, { _id: labelId, name: labelName }];
    }
    else {
      // For updating an existing note
      updatedLabels = note.labels.includes(labelId)
        ? note.labels.filter((id) => id !== labelId)
        : [...note.labels, labelId];
    }

    try {
      if(isCreating){
        setNoteData((prevNoteData) => ({
          ...prevNoteData,
          labels: updatedLabels,
        }));
      }else{
        // Update note in the backend for existing note
        await noteService.updateNote(note._id, { labels: updatedLabels });

        setNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
            prevNote._id === note._id ? { ...prevNote, labels: updatedLabels } : prevNote
          )
        );
        
        //For Single Note
        if (setNote) {
          setNote((prevNote) => ({
            ...prevNote,
            labels: updatedLabels,
          }));
        }
      }
      console.log("Note labels updated successfully");
    } catch (error) {
      console.error("Error updating note labels:", error);
    }
  };

  return (
    <div className="shadow-2xl z-5003 border-gray-400 rounded-lg ">
      <div className="pt-3 w-52 z-4001 bg-white font-custom rounded">
        <div className="px-3 text-sm">Label Note</div>
        <hr className="text-gray-50 opacity-50" />
        <div className="relative py-1.5 max-h-64 overflow-y-auto">
          {noteLabels.map((label) => (
            <div
              key={label._id}
              className="cursor-pointer flex items-center px-2.5 pt-1 pb-0.5 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLabelNote(label._id, label.name);
              }}
            >
              <div className="text-textColor opacity-60">
                
                {isCreating ?
                  noteData.labels.some((l) => l._id === label._id) ? (
                    <MdOutlineCheckBox size={18} />
                  ) : (
                    <MdCheckBoxOutlineBlank size={18} />
                  )
                  : note.labels.includes(label._id) ?
                    <MdOutlineCheckBox size={18} />
                    :
                    <MdCheckBoxOutlineBlank size={18} />
                }
              </div>
              <div className="max-w-40 pt-0.5 ml-1.5 text-13 font-normal break-words">
                {label.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};