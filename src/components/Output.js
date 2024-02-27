import React from "react";
import { useCandidate } from "../store/Context";
import AnalyzerOutput from "./Output/AnalyzerOutput";
import NoData from "./Output/NoData";
import OutputButtons from "./Output/OutputButtons";

const Output = () => {
  const { promptResult } = useCandidate();

  return (
    <div className=" overflow-scroll no-scrollbar w-[37.5%] bg-[#F5F5F5]  flex  p-6 flex-col gap-4 max-h-[137vh]  min-h-[135vh] border-r-2 border-solid border-[#D1D5DB]">
      <div className="mt-10">
        <OutputButtons />

        {promptResult && promptResult.length > 0 ? (
          <AnalyzerOutput />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Output;
