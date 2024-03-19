import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCandidate } from "../../store/Context";

const ParserInfo = () => {
  const {
    promptResult,
    mode,
    isNewData,
    setOutput,
    defaultBullhornData,
    setModeOfData,
    setDataLoader,
    setLoaderDetails,
    setThisNewData,
  } = useCandidate();

  const [parsedBullhornData, setParsedBullhornData] = useState(null);
  const [showParsedData, setShowParsedData] = useState(false);

  const switchData = async () => {
    const isShowingParsedData = !showParsedData;
    setShowParsedData(isShowingParsedData);
    setOutput(isShowingParsedData ? parsedBullhornData : defaultBullhornData);
    setModeOfData(isShowingParsedData ? "CV_bullhorn" : "bullhorn");
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
      setThisNewData(false);
      toast.success("Successfully parsed bullhorn data.");
    } catch (error) {
      console.error(error);
      toast.warn(`Error parsing resume: ${error.response?.data?.message || "Resume format is not supported"}`);
    }
    setDataLoader(false);
  };

  return (
    <>
      {promptResult && (
        <div className="flex justify-between border-4 border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
          <p className="text-[#919191] italic text-[1rem]">
            {mode === "CV" || mode === "CV_bullhorn" ? "Parsed with Offshorly parser" : "Parsed with Bullhorn"}
          </p>

          {mode === "bullhorn" && isNewData ? (
            <button
              className="border border-black border-solid text-black bg-[#F5F5F5] w-1/4 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={parseBullhornData}
            >
              <i className="fa-solid fa-code"></i> Parse
            </button>
          ) : mode !== "CV" && (
            <button
              className="border border-black border-solid text-black bg-[#F5F5F5] w-1/3 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              onClick={switchData}
            >
              <i className="fa-solid fa-up-down"></i> Switch Parser
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ParserInfo;
