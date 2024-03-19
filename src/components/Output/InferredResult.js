import React from "react";
import { useCandidate } from "../../store/Context";

const InferredResult = () => {
  const { promptResult,mode } =
    useCandidate();
    console.log(mode)
    console.log(promptResult)
    
  return (
    <>
      {/* Inferred Age  */}
      {promptResult.inferredAge ? (
  <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
    <p className="font-semibold py-2">Inferred Age</p>
    <div className="flex flex-wrap items-center">
      <p className="w-1/4 inline-block">Inferred Age:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {promptResult.inferredAge ? promptResult.inferredAge.Age : "N/A"}
      </span>
    </div>
    <div className="flex flex-wrap items-center">
      <p className="w-1/4 inline-block">AI Confidence:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {promptResult.inferredAge ? promptResult.inferredAge.ageConfidence : "N/A"}
      </span>
    </div>
  </div>
) : ''}

      {/* Inferred Language Skills  */}
      {promptResult.languageSkills  ? (
  <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
    <p className="font-semibold py-2">Inferred Language Proficiency</p>
    {promptResult.languageSkills && promptResult.languageSkills.length > 0 && promptResult.languageSkills.map((val, index) => (
          <div className="mb-2" key={index}>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Language:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {val.Language}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Confidence:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {val.confidence}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="w-1/4 inline-block">Proficiency:</p>
              <span className="text-[#919191] w-3/4 inline-block">
                {val.enProficiency || val.jpProficiency}
              </span>
            </div>
          </div>
        ))}
  </div>
) : ''}

      {/* Inferred Location  */}
      {promptResult.inferredLocation  ? (
  <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
    <p className="font-semibold py-2">Inferred Location</p>
    <div className="flex flex-wrap items-center">
      <p className="w-1/4 inline-block">Location:</p>
      <span className="text-[#919191] w-3/4 inline-block">
        {promptResult.inferredLocation.Location || 'N/A'}
      </span>
    </div>
    <div className="flex flex-wrap items-center">
      <p className="w-1/4 inline-block">AI Confidence:</p>
      <span className="text-[#919191] w-3/4 inline-block">
      {promptResult.inferredLocation.locationConfidence || 'N/A'}
      </span>
    </div>
  </div>
) : ''}

    </>
  );
};

export default InferredResult;
