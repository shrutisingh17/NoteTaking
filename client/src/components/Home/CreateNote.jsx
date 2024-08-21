import React, { useState, useRef, useEffect, useContext } from "react";
import { BiSolidPaint } from "react-icons/bi";
import { TbPinned } from "react-icons/tb";
import { MdOutlineCheckBox, MdOutlinePhoto } from "react-icons/md";
import Icon from "../NoteFooter/Icon";
import { ListContent } from "../List/ListContent";
import { Labels } from "../Labels";
import axios from "axios";
import { AddImage } from "../AddImage";

const CreateNote = ({ setNotes }) => {

  const [showSection, setShowSection] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const [noteData, setNoteData] = useState({
    title: "",
    backgroundColor: "#FFFFFF",
    backgroundImage: "",
    isPinned: false,
    content: "",
    listContent: {},
    labels: [],
    image_url: ""
  });

  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [noteData.content]);

  const handleTogglePinned = () => {
    setNoteData((prevData) => ({
      ...prevData,
      isPinned: !prevData.isPinned,
    }));
  };

  const submitNote = async () => {
    try {
      const response = await axios.post("http://localhost:8800/api/notes", noteData);
      console.log("Note created successfully:", response.data);

      setNoteData({ title: "", content: "", backgroundColor: '#FFFFFF', isPinned: false, listContent: [], labels: [], image_url: "" });
      setNotes((prevNotes) => [...prevNotes, { ...response.data.newNote }]);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <div
      className="mx-auto mt-8 mb-4 w-566 h-auto rounded-lg"
      style={{ backgroundColor: noteData?.backgroundColor }}
    >
      <div className="p-0.5 border border-solid border-gray-300 rounded-lg shadow-noteShadow">
        <AddImage selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
        <div className="flex flex-col justify-center rounded-t-lg"
          style={{
            backgroundImage: `url(${noteData?.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
          }}>
          {showSection && (
            <div className="flex px-4 py-3">
              <input
                className="flex-1 placeholder-gray-600 text-base text-textColor  text-opacity-70 outline-none bg-transparent"
                type="text"
                placeholder="Title"
                value={noteData.title}
                onChange={(e) =>
                  setNoteData({ ...noteData, title: e.target.value })
                }
              />
              <div
                className="opacity-80 text-textColor flex items-center justify-center h-8 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor"
                onClick={handleTogglePinned}
              >
                <TbPinned size={23} />
              </div>
            </div>
          )}

          <div className="flex">
            {showList && (
              <div className="h-auto w-full py-1">
                <ListContent note={noteData} setNote={setNoteData} isCreating={true} />
              </div>
            )}
            {!showList && (
              <textarea
                ref={textareaRef}
                onClick={() => setShowSection(true)}
                className={`resize-none bg-transparent flex-1 placeholder-gray-600 placeholder:font-medium placeholder:tracking-wide outline-none px-4 py-3 font-normal leading-6 text-textColor ${!showSection ? "text-base" : "text-sm"
                  }`}
                type="text"
                placeholder="Take a note..."
                value={noteData.content}
                onChange={(e) =>
                  setNoteData({ ...noteData, content: e.target.value })
                }
              />
            )}

            {!showSection && (
              <div className="opacity-90 flex gap-2 text-gray-600 mr-4">
                <div
                  className="flex items-center justify-center h-full w-11 border border-solid border-transparent rounded-full hover:bg-hoverColor"
                  onClick={() => {
                    setShowSection(true);
                    setShowList(true);
                    // handleToggleList();
                  }}
                >
                  <MdOutlineCheckBox size={24} />
                </div>
                <div className="flex items-center justify-center h-full w-11 border border-solid border-transparent rounded-full hover:bg-hoverColor">
                  <BiSolidPaint size={24} />
                </div>
                <div className="flex items-center justify-center h-full w-11 border border-solid border-transparent rounded-full hover:bg-hoverColor">
                  <MdOutlinePhoto size={24} />
                </div>
              </div>
            )}
          </div>
          <div className="px-2.5 py-1.5 flex items-center flex-wrap font-custom">
            <Labels noteData={noteData} setNoteData={setNoteData} isCreating={true} />
          </div>
        </div>
        {showSection && (
          <div className="flex items-center my-1 text-gray-800">
            {/* flex-1 flex-grow flex-shrink-0 */}
            <Icon noteData={noteData} setNoteData={setNoteData} isCreating={true} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            <div
              onClick={() => {
                setShowSection(false);
                setShowList(false);
                submitNote();
              }}
              className="h-10 w-20 px-6 py-2 mr-4 flex justify-center items-center text-gray-600 text-base font-medium leading-5 cursor-pointer hover:bg-hoverColor"
            >
              Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNote;