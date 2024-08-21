import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNoteContext } from "../Context/Context";
import { Link } from "react-router-dom";
import noteService from "../services/noteService";

export const Labels = ({
  note,
  setNote,
  isCreating,
  setNoteData,
  noteData,
}) => {
  const [noteWithLabels, setNoteWithLabels] = useState(null);
  const { setNotes } = useNoteContext();

  useEffect(() => {
    const fetchLabelsByNoteId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/notes/labels/${note._id}`
        );
        setNoteWithLabels(response.data.labels);
      } catch (error) {
        console.log("Label Not Found: ", error);
      }
    };
    if (!isCreating) {
      fetchLabelsByNoteId();
    }
  }, [note]);

  const handleLabelForNewNote = (labelId) => {
    const isLabelPresent = noteData.labels.some((label) => label._id === labelId);
    const updatedLabels = isLabelPresent
      ? noteData.labels.filter((label) => label._id !== labelId)
      : [
          ...noteData.labels,
          {
            _id: labelId,
            name: noteLabels.find((label) => label._id === labelId)?.name,
          },
        ];
  
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      labels: updatedLabels,
    }));
  };

  const handleLabelForExistingNote = async (labelId) => {
    const updatedLabelsForNoteWithLabels = noteWithLabels?.filter(
      (label) => label._id !== labelId
    );
    const updatedLabelsForNotes = note.labels.filter((id) => id !== labelId);
  
    try {
      await noteService.updateNote(note._id, { labels: updatedLabelsForNoteWithLabels });
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote._id === note._id
            ? { ...prevNote, labels: updatedLabelsForNotes }
            : prevNote
        )
      );
      setNoteWithLabels((prevLabels) =>
        prevLabels.filter((label) => label._id !== labelId)
      );
      //for Single Note Page
      if (setNote) {
        setNote((prevNote) => ({
          ...prevNote,
          labels: updatedLabelsForNotes,
        }));
      }
    } catch (error) {
      console.error("Error updating note labels:", error);
    }
  };

  const handleLabelNote = async (labelId) => {
    if (isCreating) {
      handleLabelForNewNote(labelId);
    } else {
      await handleLabelForExistingNote(labelId);
    }
    console.log("Note labels updated successfully");
  };
  
  const renderLabels = (labels, handleLabelClick) =>
    labels.map((label, index) => (
      <div
        key={index}
        className="relative flex items-center justify-center h-6 w-auto bg-labelBg mr-1.5 mt-1.5 rounded-xl cursor-pointer shadow hover-container"
      >
        <Link to={`/label/${label._id}`}>
          <div className="flex justify-start items-center px-1">
            <span className="pl-2 pr-3.5 border border-transparent overflow-x-hidden overflow-y-hidden text-xs leading-5 text-center text-ellipsis text-nowrap whitespace-normal text-label">
              #{label?.name}
            </span>
          </div>
        </Link>
        <div
          onClick={() => handleLabelClick(label._id)}
          className="absolute top-1 right-1 hidden text-textColor opacity-60 hover-content"
        >
          <RxCross2 size={14} />
        </div>
      </div>
    ));
    
  return (
    <>
      {isCreating
        ? renderLabels(noteData?.labels || [], handleLabelNote)
        : renderLabels(noteWithLabels || [], handleLabelNote)}
    </>
  );
};