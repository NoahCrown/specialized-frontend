import React from "react";
import PersonalInfo from "./PersonalInfo";
import JobHistory from "./JobHistory";
import Skills from "./Skills";
import InferredResult from "./InferredResult";

const AnalyzerOutput = () => {
  return (
    <>
      <p className="text-[#919191] ">Resume information</p>
      {/* Personal Information  */}
      <PersonalInfo />
      {/* Job History  */}
      <JobHistory />
      {/* Skills and Qualification */}
      <Skills />
      {/* Inferred Data Result  */}
      <InferredResult/>
    </>
  );
};

export default AnalyzerOutput;
