import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import SideBar from "../components/Home/SideBar";
import Notes from "../components/Home/Notes";
import { Routes, Route, useLocation } from "react-router-dom";
import { Archive } from "./Archive";
import { LabelPage } from "./LabelPage";
import { SingleNotePage } from "./SingleNotePage";
import { useNoteContext } from "../Context/Context";
import { SearchPage } from "./SearchPage";
import { Trash } from "./Trash";

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const[query, setQuery] = useState("");
  const [results, setResults] = useState([]);
 
  useEffect(() => {
    const fetchSearchNotes = async () => {
      try {
        // const res = await axios.get(`http://localhost:8800/api/notes/search?query=${query}`);
        // setResults(res.data.results);
        // console.log(res.data.results);
        // console.log(query); 
        if (query.trim() !== "") {
          const res = await axios.get(`http://localhost:8800/api/notes/search?query=${query}`);
          setResults(res.data.results);
          console.log(res.data.results);
        } else {
          // If the query is empty, you might want to handle this case (e.g., show all notes)
          // For now, let's set results to an empty array
          setResults([]);
        }
        console.log(query); 
      } catch (error) {
        console.error("Error fetching notes:", error.response);  // Log the error response
      }
    };
    fetchSearchNotes();
  }, [query]);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = headerRef.current.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  useEffect(() => {
    const headerElement = headerRef.current;
    headerElement.addEventListener("scroll", handleScroll);

    return () => {
      headerElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen relative">
        <Header toggleSidebar={toggleSidebar} setQuery={setQuery} setResults={setResults} isScrolled={isScrolled}/>          
        <div className="h-full flex gap-0 pt-16">
        <SideBar expanded={expanded} setExpanded={setExpanded} />          
          <div  ref={headerRef} className="flex-1 flex flex-col overflow-y-scroll">
            <Routes location={previousLocation || location}>
              <Route path="/" element={<Notes />} />
              <Route path="/search" element={<SearchPage results={results} />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/label/:labelId" element={<LabelPage />} />
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </div>

          {previousLocation && (
            <Routes>
              <Route path="/note/:id" element={<SingleNotePage />} />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
