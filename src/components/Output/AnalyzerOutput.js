import React from "react";
import PersonalInfo from "./PersonalInfo";
import JobHistory from "./JobHistory";
import Skills from "./Skills";
import InferredResult from "./InferredResult";

const AnalyzerOutput = () => {
  return (
    <>
            <p className="text-black font-bold mb-2  ">Resume information</p>

    <div className="border-2 border-[#E7E7E7] px-4 ">
      {/* Personal Information  */}
      <PersonalInfo />
      {/* Job History  */}
      <JobHistory />
      {/* Skills and Qualification */}
      <Skills />
      {/* Inferred Data Result  */}
      <InferredResult />
    </div>
    </>

  );
};

export default AnalyzerOutput;
