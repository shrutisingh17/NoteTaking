import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { PiTagSimpleFill } from "react-icons/pi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { MdCheck } from "react-icons/md";
import { useNoteContext } from "../../Context/Context";

export const EditLabels = ({ setEditLabelsVisible }) => {
  const [labelData, setLabelData] = useState({ name: "" });
  const [focusedLabel, setFocusedLabel] = useState(null);
  const [labelAlreadyExists, setLabelAlreadyExists] = useState(false);
  const {noteLabels, setNoteLabels} = useNoteContext();

  const inputRefs = useRef({});
  noteLabels.forEach((label) => {
    inputRefs.current[label._id] = React.createRef();
  });

  const handleClick = (labelId) => {
    const inputRef = inputRefs.current[labelId];
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      setFocusedLabel(noteLabels.find((label) => label._id === labelId));
    }
  };

  const createLabel = () => {
    axios
      .post("http://localhost:8800/api/labels", labelData)
      .then((response) => {
        console.log("Label created successfully:", response.data);
        setLabelData({ name: "" });
        setNoteLabels((prevLabels) => [
          ...prevLabels,
          {_id: response.data.label._id, name: labelData.name },
        ]);
      })
      .catch((error) => {
        if (error.response.status === 400 && error.response.data.message === "Label with this name already exists") {
          setLabelAlreadyExists(true);
          console.log("Label with this name already exists");
        } else {
          console.error("Failed to create label:", error);
        }
      });
      setLabelAlreadyExists(false);
  };

  const updateLabel = (labelId) => {
    axios
      .put(`http://localhost:8800/api/labels/${labelId}`, {
        name: focusedLabel.name,
      })
      .then((response) => {
        console.log("Label updated successfully:", response.data);

        setNoteLabels((prevLabels) => {
          return prevLabels.map((label) =>
            label._id === labelId
              ? { ...label, name: focusedLabel.name }
              : label
          );
        });
        setFocusedLabel((prev) => {
          return prev?._id === labelId ? null : prev;
        });
      })
      .catch((error) => {
        console.error("Failed to update label:", error);
      });
  };

  const deleteLabel = (labelId) => {
    axios
      .delete(`http://localhost:8800/api/labels/${labelId}`)
      .then((response) => {
        console.log("Label deleted successfully:", response.data);
        setNoteLabels((prevLabels) => prevLabels.filter((label) => label._id !== labelId));
      })
      .catch((error) => {
        console.error("Failed to delete label:", error);
      });
  };

  return (
    <div className="h-auto w-96 bg-white absolute top-12 left-1/2 transform -translate-x-1/2 opacity-100 z-20">
      <div className=" max-h-96 p-3.5 text-textColor overflow-y-auto">
        <p className="h-6 text-base font-medium">Edit labels</p>
        <div className="flex items-center h-11 text-15">
          <div className="h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200">   
            <LuPlus size={20} />
          </div>
          <input
            placeholder="Create new label"
            className="flex-1 outline-none focus:border-b focus h-6 w-6 mx-3.5 text-sm text-start font-medium placeholder:text-label"
            value={labelData.name}
            onChange={(e) => setLabelData({ name: e.target.value })}
          />
          <div
            className="cursor-pointer h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200 text-textColor opacity-60 "
            onClick={createLabel}
          >
            <MdCheck size={21} />
          </div>
        </div>
        {labelAlreadyExists && (
          <span className="p-2.5 text-xs italic text-d93025">
            Label already exists
          </span>
        )}
        <>
          {noteLabels.map((label) => (
            <div
              key={label._id}
              className="icon-container h-11 flex items-center text-15 text-gray"
            >
              <div className="cursor-pointer h-6 w-6 flex justify-center items-center rounded-full text-textColor hover:bg-gray-200 ">
                <PiTagSimpleFill
                  size={17}
                  className={`opacity-50 ${focusedLabel?._id === label._id ? "hidden" : "default-icon"}`}
                />
                <BiSolidTrashAlt
                  size={16}
                  className={`hover:text-black ${ focusedLabel?._id === label._id ? "" : "hover-icon"}`}
                  onClick={() => deleteLabel(label._id)}
                />
              </div>
              <input
                ref={inputRefs.current[label._id]}
                className="h-6 mx-3.5 flex-1 text-sm text-label font-medium text-start outline-none border-b border-transparent focus:border-gray-300"
                value={
                  label._id === focusedLabel?._id
                    ? focusedLabel?.name
                    : label.name
                }
                onChange={(e) =>
                  setFocusedLabel({
                    ...focusedLabel,
                    name: e.target.value,
                  })
                }
                onClick={() => handleClick(label._id)}
              />
              <div className="cursor-pointer h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-200 text-textColor opacity-50">
                <MdModeEditOutline size={18} className={`${focusedLabel?._id === label._id ? "hidden" : "" }`} onClick={() => handleClick(label._id)} />
                <MdCheck size={21} className={`${ focusedLabel?._id === label._id ? "" : "hidden"}`} onClick={() => updateLabel(label._id)} />
              </div>
            </div>
          ))}
        </>
      </div>
      <div className="px-2.5 py-3.5 flex justify-end text-15 border-t border-t-gray-300">
        <div onClick={() => { createLabel(); setEditLabelsVisible(false); }} className="cursor-pointerh-9 w-20 px-6 py-2 text-sm font-medium tracking-wide rounded hover:bg-gray-200">
          Done
        </div>
      </div>
    </div>
  );
};

// const handleClick = (labelId) => {
//   if (labelId === 'upperInput') {
//     const upperInputRef = inputRefs.current['upperInput'];
//     if (upperInputRef && upperInputRef.current) {
//       upperInputRef.current.focus();
//       setFocusedLabel(null);
//       setUpperInputFocused(true); // Set a state to track the focus state of the upper input
//     }
//   } else {
//     const inputRef = inputRefs.current[labelId];
//     if (inputRef && inputRef.current) {
//       inputRef.current.focus();
//       setFocusedLabel(labels.find((label) => label._id === labelId));
//       setUpperInputFocused(false); // Reset the state for the upper input focus
//     }
//   }
// };