import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCandidate } from "../../store/Context";
import { parseBullhornData } from "../../services/apiServices"; // Make sure to import the service

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

  const switchData = () => {
    const isShowingParsedData = !showParsedData;
    setShowParsedData(isShowingParsedData);
    setOutput(isShowingParsedData ? parsedBullhornData : defaultBullhornData);
    setModeOfData(isShowingParsedData ? "CV_bullhorn" : "bullhorn");
  };

  const handleParseBullhornData = async () => {
    if (!promptResult || !promptResult[0]?.id) return;
    setDataLoader(true);
    setLoaderDetails("Parsing");
    try {
      const data = await parseBullhornData(promptResult[0].id);
      setParsedBullhornData(data);
      setThisNewData(false);
    } catch (error) {
      // Error handling is already done in parseBullhornData
      console.log(promptResult[0].id)
    } finally {
      setDataLoader(false);
    }
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
              onClick={handleParseBullhornData}
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
