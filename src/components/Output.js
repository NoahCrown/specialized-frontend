import React, { useState } from "react";
import { useCandidate } from "../store/Context";
import axios from "axios";
import AnalyzerOutput from "./AnalyzerOutput";
import { toast } from "react-toastify";

const Output = () => {
  const {
    promptResult,
    mode,
    setOutput,
    defaultBullhornData,
    setModeOfData,
    setDataLoader,
    setLoaderDetails,
    isNewData,
    setThisNewData,
    resumeFiles,
    handleOpenPdfInNewTab,
    isCVFileSelectorVisible,
    setToggleFileList
  } = useCandidate();

  const [parsedBullhornData, setParsedBullhornData] = useState(null);
  const [showParsedData, setShowParsedData] = useState(false);

  const switchData = () => {
    setShowParsedData(!showParsedData);
    if (showParsedData) {
      setOutput(parsedBullhornData);
      setModeOfData("CV_bullhorn");
    } else {
      setOutput(defaultBullhornData);
      setModeOfData("bullhorn");
    }
  };

  const parseBullhornData = async () => {
    setLoaderDetails("Parsing");
    setDataLoader(true);
    try {
      toast.success("Parsing bullhorn data.");

      const response = await axios.post("/api/extract_bullhorn", {
        candidateId: promptResult[0].id,
      });
      setParsedBullhornData(response.data);
      setDataLoader(false);
      setThisNewData(false);
      toast.success("Successfully parsed bullhorn data.");
    } catch (error) {
      console.log(error)
      setDataLoader(false);
      toast.warn("Error: Resume format is not supported");
    }
  };

  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[145vh]  min-h-[145vh] border-r-2 border-solid border-[#D1D5DB]">
      <div className="mt-10">
        <div className="flex flex- justify-between items-center mb-5">
          <div className="">
            <h1 className="text-3xl font-bold">Output</h1>
          </div>
          {promptResult && (
            <>
              <div className="flex gap-4 w-[60%]">
                <button
                  onClick={setToggleFileList}
                  className="border border-black border-solid text-black font-bold bg-[#F5F5F5] w-1/2 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
                >
                  <i class="fa-regular fa-eye"></i> View CV
                </button>
                <button className="w-1/2 bg-black text-white rounded-md">
                  Push to Bullhorn
                </button>
              </div>
            </>
          )}
        </div>
        {isCVFileSelectorVisible === true && Array.isArray(resumeFiles) && (
          <div className="border-4 border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
            <p className="text-[.80rem] text-[#8F8F8F] w-full text-left block mb-2">
              Candidate Files:
            </p>
            <div className="flex gap-4 justify-start flex-wrap items-center">
              {resumeFiles.map((val, index) => (
                <button className=" rounded-md border-[.09rem] border-solid border-black p-2" onClick={() => handleOpenPdfInNewTab(val.candidateFile)} key={index}>
                <i class="fa-regular fa-file mr-1"></i> {val.fileName}</button>
              ))} 
            </div>
          </div>
        )}

        {promptResult && (
          <div className="flex justify-between border-4 border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
            <p className="text-[#919191] italic text-[1rem]">
              {mode === "CV" || mode === "CV_bullhorn"
                ? "Parsed with Offshorly parser"
                : "Parsed with Bullhorn"}
            </p>

            {mode === "bullhorn" && isNewData ? (
              <button
                className="border border-black border-solid text-black bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
                onClick={parseBullhornData}
              >
                <i className="fa-solid fa-code"></i> Parse
              </button>
            ) : (
              !isNewData &&
              (mode === "bullhorn" || mode === "CV_bullhorn") && (
                <button
                  className="border border-black border-solid text-black bg-[#F5F5F5] w-1/3 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
                  onClick={switchData}
                >
                  <i class="fa-solid fa-up-down"></i> Switch Parser
                </button>
              )
            )}
          </div>
        )}

        {promptResult && promptResult.length > 0 ? (
          <AnalyzerOutput />
        ) : (
          <div className="w-full flex justify-center items-center flex-col min-h-[80vh]">
            <img
              src={require("../assets/no-data.png")}
              alt="svg-no-data"
              className="w-1/3"
            />
            <p className="text-[#919191]">No data to show.</p>
            <p className="text-[#919191]">Upload or run CVs to load data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
