import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import { BiSolidImageAlt } from "react-icons/bi";
import { GiPencilBrush } from "react-icons/gi";
import { MdLabel } from "react-icons/md";
import { useNoteContext } from "../Context/Context";
import axios from "axios";
import { NoteSection } from "../components/NoteSection";
import MasonryGrid from "../components/MasonryGrid";

export const SearchPage = ({ results }) => {
  const { noteLabels } = useNoteContext();
  const [showMore, setShowMore] = useState(false);

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
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const visibleColors = showMore ? colors : colors.slice(0, 8);

  const types = [
    { icon: <FaRegBell size={32} color="white" />, title: "Reminders" },
    { icon: <IoListSharp size={32} color="white" />, title: "Lists" },
    { icon: <BiSolidImageAlt size={32} color="white" />, title: "Images" },
    { icon: <GiPencilBrush size={32} color="white" />, title: "Drawings" },
  ];

  return (
    <>
      {results.length === 0 ? (
        <div className="w-full max-w-800 m-auto">
          {/* TYPES */}
          <div className="my-2 mx-20 bg-white shadow-custom">
            <div className="p-2">
              <span className="text-textColor text-15 font-medium">Types</span>
            </div>
            <div className="h-40 flex flex-row">
              {types.map((type, index) => (
                <div
                  key={index}
                  className="w-1/4 border-2 border-white cursor-pointer text-center"
                >
                  <div className="relative h-full w-full bg-search flex items-center justify-center">
                    {type.icon}
                    <div className="absolute bottom-2 h-7 px-1.5 w-full tracking-wide text-13 font-normal text-center text-white">
                      {type.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LABELS */}
          <div className="my-2 mx-20 bg-white shadow-custom">
            <div className="p-2">
              <span className="text-textColor text-15 font-medium">Labels</span>
            </div>
            <div className="h-40 flex flex-row">
              {noteLabels.map((label, index) => (
                <div
                  key={index}
                  className="w-1/4 border-2 border-white cursor-pointer text-center"
                >
                  <div className="relative h-full w-full bg-gray-100 flex items-center justify-center">
                    <MdLabel size={40} color="gray" />
                    <div className="absolute bottom-2 h-7 px-1.5 w-full tracking-wide text-13 font-normal text-center text-textColor">
                      {label.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="my-2 mx-20 bg-white shadow-custom">
            <div className="flex justify-between p-2">
              <span className="text-textColor text-15 font-medium">Colors</span>
              <div
                className="cursor-pointer h-9 py-2 px-6 text-sm font-medium text-search hover:bg-slate-100"
                onClick={toggleShowMore}
              >
                {showMore ? "Less" : "More"}
              </div>
            </div>
            <div
              className={`h-${
                showMore ? "40" : "20"
              } w-full flex flex-row flex-wrap`}
            >
              {visibleColors.map((color, index) => (
                <div className="w-12.5 h-20">
                  <div
                    key={index}
                    className="h-3/5 w-3/5 m-auto border rounded-full border-gray-400 hover:border-textColor cursor-pointer"
                  >
                    <div
                      key={index}
                      className="flex items-center justify-center h-full w-full rounded-full"
                      style={{ backgroundColor: color.code }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
            <MasonryGrid notes={results} />
        </div>
      )}
    </>
  );
};
