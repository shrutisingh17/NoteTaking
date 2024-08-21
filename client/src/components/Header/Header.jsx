import React, { useState, useEffect } from "react";
import logo from "../../assets/images.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { TfiViewList } from "react-icons/tfi";
import { FaRegMoon } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import SearchBar from "./SearchBar";

const Header = ( {toggleSidebar, setQuery, setResults, isScrolled} ) => {

  return (
      <div className={`w-full fixed z-4001 bg-white text-headerColor h-16 p-2 pl-6 flex justify-between border-b ${
          isScrolled ? "header-shadow" : " bg-black"}`}
      >    
      {/* fixed-header    */}
        <div className="flex items-center">
        <div className="cursor-pointer text-black p-3 mr-3 hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <RxHamburgerMenu size={22} onClick={toggleSidebar} />
        </div>

        <div className="w-7 ">
          <img src={logo} />
        </div>
        <h1 className="pl-4 text-2xl">Keep</h1>
      </div>

      <SearchBar setQuery={setQuery} setResults={setResults}/>
      
      <div className="pr-6 flex items-center">
        {/* <div className="p-3 cursor-pointer hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <IoSearchSharp size={23} />
        </div> */}
        <div className="p-3 cursor-pointer hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <IoMdRefresh size={23} />
        </div>
        <div className="p-3 cursor-pointer hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <TfiViewList size={20} />
        </div>
        <div className="p-3 cursor-pointer hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <FaRegMoon size={20} />
        </div>
        <div className="p-3 cursor-pointer hover:bg-hoverColor rounded-full transition duration-300 ease-in-out">
          <CgProfile size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
