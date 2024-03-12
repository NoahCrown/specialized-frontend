import React from "react";
import { useCandidate } from "../store/Context";
import AnalyzerOutput from "./Output/AnalyzerOutput";
import NoData from "./Output/NoData";
import OutputButtons from "./Output/OutputButtons";

const Output = () => {
  const { promptResult } = useCandidate();
  console.log(promptResult)


  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[145vh]  min-h-[145vh] border-r-2 border-solid border-[#D1D5DB]">
      <div className="mt-10">
        <OutputButtons />

        {promptResult ? (
          <AnalyzerOutput />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Output;
