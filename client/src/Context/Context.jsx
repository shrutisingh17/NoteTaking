import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteLabels, setNoteLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);
  
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/labels');
        setNoteLabels(response.data);
      } catch (error) {
        console.error('Error fetching labels:', error);
      }
    };
    fetchLabels();
  }, []);

  // useEffect(() => {
  //   setSelectedLabels(selectedNote?.labels || []);
  // }, [selectedNote]);
  
  // const [labels, setLabels] = useState([]);

  // useEffect(() => {
  //   const fetchLabels = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8800/api/labels');
  //       setLabels(response.data);
  //     } catch (error) {
  //       console.error('Error fetching labels:', error);
  //     }
  //   };
  //   fetchLabels();
  // }, []);

  return (
    <NoteContext.Provider value={{ selectedNote, setSelectedNote, notes, setNotes, noteLabels, setNoteLabels, selectedLabels, setSelectedLabels }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};