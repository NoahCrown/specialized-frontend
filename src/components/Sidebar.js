import React, {useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import UploadCV from "./Sidebar/UploadCV";
import Searchbar from "./Sidebar/Searchbar";
import SearchbyMissingData from "./Sidebar/SearchbyMissingData";
import SearchResult from "./Sidebar/SearchResult";
import Navbar from "./Sidebar/Navbar";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("upload"); // Default to Upload component


  return (
    <div className="w-1/4 flex justify-start">
      <div className=".no-scrollbar box-border flex justify-start justify-items-start	 items-center w-full flex-col max-h-[145vh] min-h-[135vh] ">
        {/* Specialized Nav */}
        <Navbar/>

        <div className="w-full p-4">
          <div className="flex justify-between items-center">
            <button className={activeComponent === "upload" ? 'font-semibold border-b-[3px] border-[#F9BD44]' : 'font-semibold'} onClick={() => setActiveComponent("upload")}>Upload</button>
            <button className={activeComponent === "searchByName" ? 'font-semibold border-b-[3px] border-[#F9BD44]' : 'font-semibold'} onClick={() => setActiveComponent("searchByName")}>Search by Name</button>
            <button className={activeComponent === "searchByMissingData" ? 'font-semibold border-b-[3px] border-[#F9BD44]' : 'font-semibold'} onClick={() => setActiveComponent("searchByMissingData")}>Search by Data</button>
          </div>

          <div className="w-full flex justify-center items-center">
            {activeComponent === 'upload' && <UploadCV/> }
            {activeComponent === "searchByName" && <Searchbar/>} 
            {activeComponent === "searchByMissingData" && <SearchbyMissingData/>}
          </div>
        </div>
        <SearchResult/>



      </div>
    </div>
  );
};

export default Sidebar;
