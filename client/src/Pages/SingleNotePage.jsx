import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Icon from "../components/NoteFooter/Icon";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import noteService from "../services/noteService";
import { useNoteContext } from "../Context/Context";
import noteActions from "../services/noteActions";
import { TbPinned } from "react-icons/tb";
import { Labels } from "../components/Labels";
import List from "../components/List/List";
import { ListContent } from "../components/List/ListContent";

export const SingleNotePage = () => {
  const { setNotes } = useNoteContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    console.log("Fetching note for id:", id);

    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/notes/${id}`
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [note?.content]);
  console.log(note);

  const updateContent = async () => {
    try {
      await noteService.updateNote(note?._id, {
        title: note?.title,
        content: note?.content,
        listContent: note.listContent,
      });
      setNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
          prevNote._id === note._id
              ? { ...prevNote, title: note.title, content: note.content, listContent: note.listContent}
              : prevNote
          )
        );
      console.log("Note content updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  function formatDateString(dateString) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  const formattedDate = formatDateString(note?.updated_at);

  const handlePinClick = () => {
    noteActions.updatePin(note._id);
    setNote((prevNote) => ({ ...prevNote, isPinned: !isPinned }));
  };

  return (
    <div
      className="fixed left-0 top-0 h-screen w-screen flex justify-center bg-light z-5003"
      onClick={() => {
        navigate("/");
        updateContent();
      }}
    >
      <div
        style={{ backgroundColor: note?.backgroundColor,
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -15%)',}}
        className="absolute w-566 p-0.5 border rounded-xl opacity-100 z-4000"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundImage: `url(${note?.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
          }}
          className="max-h-singleNoteMaxH w-full h-full rounded-xl overflow-y-auto  min-h-noteMinH"
        >
          {/* <div className="block">
            <div
              className="absolute top-4 right-4 opacity-80  flex items-center justify-center h-8 w-8 border border-solid border-transparent rounded-full hover:bg-hoverColor"
              onClick={handlePinClick}
            >
              <TbPinned size={24} fill={note.isPinned ? "black" : "white"} />
            </div>  
          </div> */}
          <div className="h-auto">
            <div
              className="outline-none w-full bg-transparent px-3.5 pt-4 pb-3 text-textColor text-22 font-normal text-wrap leading-7 break-words whitespace-pre-wrap font-custom"
              contentEditable={true}
              onBlur={(e) => setNote({ ...note, title: e.target.innerText })}
            >
              {note?.title}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {note?.content ? (
                <textarea
                  ref={textareaRef}
                  className=" resize-none outline-none bg-transparent w-full font-custom px-4 pt-1 pb-3 text-base tracking-wide text-wrap text-textColor"
                  value={note?.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              ) : (
                <div className="pb-2">
                  <div className="h-auto w-full py-1 ">
                    {note && (
                      <ListContent
                        note={note}
                        setNote={setNote}
                        forSingleNote={true}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-2.5 py-1.5 flex items-center flex-wrap font-custom">
            {note && <Labels note={note} setNote={setNote} />}
            <div className="ml-auto mt-1.5 mr-1.5 text-13 leading-4 tracking-wide opacity-70">
              Edited {formattedDate}
            </div>
          </div>
        </div>
        <div className="flex items-center my-1 text-gray-800">
          <Icon note={note} setNote={setNote} />
          <div
            onClick={updateContent}
            className="h-10 w-20 px-6 py-2 mr-4 flex justify-center items-center text-gray-600 text-base font-medium leading-5 cursor-pointer hover:bg-hoverColor"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
};
