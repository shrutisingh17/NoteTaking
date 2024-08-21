import axios from "axios";

export const handleImageUpload = async (files) => {
  
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('images', file);
  });

  try {
    const response = await axios.post(
      "http://localhost:8800/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Image uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
