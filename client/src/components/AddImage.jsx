import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";


export const AddImage = ({ selectedFile, setSelectedFile }) => {

  const handleDelete = (index) => {
    setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      {Array.isArray(selectedFile) &&
        selectedFile.map((file, index) => (
          <div key={index} className="relative icon-container">
            <div className="h-1/2 w-1/2">
                <img
                src={URL.createObjectURL(file)}
                alt="Selected Image"
                className="max-w-full h-auto"
                />
            </div>
            <div
              onClick={() => handleDelete(index)}
              className="absolute right-1.5 bottom-1.5 h-7 w-7 bg-textColor hover:bg-opacity-75 flex justify-center items-center cursor-pointer"
            >
              <FaTrash size={13} color="white" />
            </div>
          </div>
        ))}
    </div>
  );
};
