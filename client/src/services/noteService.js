
import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api";

const noteService = {
  fetchNoteById: async (noteId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      throw error;
    }
  },

  updateNote: async (noteId, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/notes/${noteId}`, updatedData);
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  fetchLabelsByNoteId: async (noteId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/labels/${noteId}`);
      return response.data.labels;
    } catch (error) {
      console.error("Error fetching labels by note ID:", error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${noteId}`);
      console.log("Note Deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
};

export default noteService;
