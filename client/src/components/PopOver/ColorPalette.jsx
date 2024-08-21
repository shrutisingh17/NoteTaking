import React, { useState, useEffect } from "react";
import { TbDropletOff } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const ColorPalette = ({ changeColor, changeBackgroundImage, note, isCreating, noteData }) => {

  const colors = [
    { code: "#FFFFFF", name: "White" },
    { code: "#faafa8", name: "Coral" },
    { code: "#f39f76", name: "Peach" },
    { code: "#fff8b8", name: "Sand" },
    { code: "#e2f6d3", name: "Mint" },
    { code: "#b4ddd3", name: "Sage" },
    { code: "#d4e4ed", name: "Fog" },
    { code: "#aeccdc", name: "Storm" },
    { code: "#d3bfdb", name: "Dusk" },
    { code: "#f6e2dd", name: "Blossom" },
    { code: "#e9e3d4", name: "Clay" },
    { code: "#efeff1", name: "Chalk" },
  ];

  const images = [
    { name: "Default", path: "Note.png" },
    { name: "Groceries", path: "/images/Grocery.png" },
    { name: "Food", path: "/images/Food.png" },
    { name: "Music", path: "/images/Music.png" },
    { name: "Recipes", path: "/images/Recipes.png" },
    { name: "Notes", path: "/images/Notes.png" },
    { name: "Places", path: "/images/Places.png" },
    { name: "Travel", path: "/images/Travel.png" },
    { name: "Video", path: "/images/Video.png" },
    { name: "Celebration", path: "/images/Celebration.png" },
  ];

  const currentNote = isCreating ? noteData : note;

  const renderColorItem = (color, index) => (
    <div
      key={index}
      className={`relative h-7 w-7 border-2 m-0.5 rounded-full cursor-pointer ${
        currentNote.backgroundColor === color.code
          ? "border-purple-500"
          : color.code === "#FFFFFF"
          ? "border-gray-300"
          : `border-${color.code}`
      } ${currentNote.backgroundColor !== color.code ? 'hover:border-textColor' : ''}`}
    >
      <div
        className="flex items-center justify-center h-full w-full rounded-full"
        style={{ backgroundColor: color.code }}
        onClick={() => changeColor(currentNote._id, color.code)}
      >
        {color.code === "#FFFFFF" && <TbDropletOff />}
        {currentNote.backgroundColor
         === color.code && (
          <div className="absolute -right-1 -top-1">
            <FaCircle size={16} className="relative text-purple-500" />
            <FaCheck size={12} className="absolute text-white left-0.5 top-0.5" />
          </div>
        )}
      </div>
    </div>
  );


  const renderImageItem = (image, index) => (
    <div
      key={index}
      className={`relative h-9 w-9 border-2 m-0.5 rounded-full cursor-pointer 
        ${currentNote.backgroundImage === image.path ? "border-purple-500" : "border-gray-300"}
        ${currentNote.backgroundImage !== image.path ? 'hover:border-textColor' : ''}`}
    >
      <div
        className="flex items-center justify-center h-full w-full rounded-full"
        style={{ backgroundImage: `url(${image.path})`, backgroundSize: "cover" }}
        onClick={() => changeBackgroundImage(currentNote._id, image.path)}
      >
        {image.name === "Default" && <TbDropletOff />}
        {currentNote.backgroundImage === image.path && (
          <div className="absolute -right-1 -top-1">
            <FaCircle size={16} className="relative text-purple-500" />
            <FaCheck size={12} className="absolute text-white left-0.5 top-0.5" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border shadow-shad rounded-lg z-5001">
      <div className="w-auto px-2 py-1 border-b rounded-t-lg flex">
        {colors.map((color, index) => renderColorItem(color, index))}
      </div>
      <div className="w-auto px-2 py-1 rounded-b-lg flex">
        {images.map((image, index) => renderImageItem(image, index))}
      </div>
    </div>
  );
};

export default ColorPalette;