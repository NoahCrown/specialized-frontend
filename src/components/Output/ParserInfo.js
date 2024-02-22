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
      console.log(error);
      setDataLoader(false);
      toast.warn("Error: Resume format is not supported");
    }
  };

  return (
    <>
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
    </>
  );
};

export default ParserInfo;
