import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryGrid from "../components/MasonryGrid";

export const LabelPage = () => {
  const [labelNotes, setLabelNotes] = useState([]);
  const { labelId } = useParams();
  console.log(labelId)

  useEffect(() => {
    const fetchNotesByLabel = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/labels/notes/${labelId}`);
        setLabelNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotesByLabel();
  }, [labelId]);

  return (
    <div className="w-full mx-auto ">
      <MasonryGrid notes={labelNotes} />
    </div>
  );
};
