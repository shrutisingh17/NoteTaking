import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchBar = ({ setQuery, setResults }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`relative flex items-center max-w-720 w-full h-12 border-transparent rounded-lg ${
        isFocused ? "bg-white shadow-searchBar" : "bg-gray-100"
      }`}
    >
      <Link to={"/search"}>
        <button className="absolute left-0 top-0 py-3 px-3.5">
          <IoMdSearch size={23} className="text-headerColor" />
        </button>
        <div className="w-full mx-14">
          <input
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="h-11 w-full outline-none pb-3 pt-2.5 text-base font-normal bg-transparent placeholder:text-lg text-textColor"
          />
        </div>
      </Link>
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
            setResults([]);
          }
        }}
       className="absolute right-0 top-0 py-3 px-3.5">
        <RxCross2 size={23} className="text-headerColor" />
      </button>
    </div>
  );
};

export default SearchBar;
