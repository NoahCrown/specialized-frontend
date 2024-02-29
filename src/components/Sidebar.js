import React from "react";
import "react-toastify/dist/ReactToastify.css";
import UploadCV from "./Sidebar/UploadCV";
import Searchbar from "./Sidebar/Searchbar";
import SearchbyMissingData from "./Sidebar/SearchbyMissingData";
import SearchResult from "./Sidebar/SearchResult";
import Navbar from "./Sidebar/Navbar";

const Sidebar = () => {
  return (
    <div className="w-1/4 flex justify-start">
      <div className=".no-scrollbar box-border flex justify-start justify-items-start	 items-center w-full flex-col max-h-[145vh] min-h-[135vh] ">
        {/* Specialized Nav */}
        <Navbar/>
        {/* Pdf Info */}
        <UploadCV/>
        {/* Search Bar  */}
        <Searchbar/>
        {/* Search by Missing Data  */}
        <SearchbyMissingData/>
        {/* Results  */}
        <SearchResult/>
      </div>
    </div>
  );
};

export default Sidebar;
