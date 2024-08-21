import React, { useEffect, useState, useRef } from "react";
import { PiPlusBold } from "react-icons/pi";
import { v4 as uuidv4 } from 'uuid';

const List = ({ note, setNote }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocusOnNewItem, setFocusOnNewItem] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    console.log("Updated note:", note);
    if (isFocusOnNewItem) {
      // Focus on the input field when a new item is added
      inputRef.current.focus();
      setFocusOnNewItem(false);
    }
  }, [isFocusOnNewItem]);

  const handleInputChange = (event) => {
    const newText = event.target.value;

    setInputValue(newText);

    if (newText.trim() !== '') {
      const listContentArray = Array.isArray(note.listContent) ? note.listContent : [];
      // Create a new listContent item immediately
      const newItem = {
        id: uuidv4(),
        task: newText,
        isComplete: false,
      };
      
      setNote((prevnote) => ({
        ...prevnote,
        listContent: [...listContentArray, newItem],
      }));
      // Set the flag to focus on the input field after adding a new item
      setFocusOnNewItem(true);
    }
  };
  
  const handleInputBlur = () => {
    setInputValue('');
    setIsFocused(false);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="">
      <div
        className={`h-8 flex items-center border-t border-b ${
          isFocused ? 'border-borderColor' : 'border-transparent'
        }`}
      >
        <div className="pl-6">
          <PiPlusBold size={14} className="text-gray-500" />
        </div>
        <input
          type="text"
          className="py-1 pl-3 pr-11 flex-1 bg-transparent placeholder-gray-500 placeholder:font-medium placeholder:tracking-wide outline-none font-normal leading-6 text-textColor text-sm"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleInputBlur}
          placeholder="List Item"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default List;

{/* {Array.isArray(note?.listContent ?? []) && note?.listContent.map((item) => ( */}
          {/* <ListContent
          setNote={setNote}
          note={note}
        /> */}
      {/* ))} */}
      {/* {Array.isArray(note?.listContent ?? []) && (
      <ListContent
        setNote={setNote}
        note={note}
        isCreating={true}
      />
    )} */}