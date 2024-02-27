import React from "react";
import { useCandidate } from "../../store/Context";

const InferredResult = () => {
  const { inferedData, inferedLangProficiency, inferedLocation, mode } =
    useCandidate();
    console.log(inferedData)
  return (
    <>
      {/* Inferred Age  */}
      {inferedData && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2">Inferred Age</p>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">Inferred Age:</p>
            <span className="text-[#919191] w-3/4 inline-block">

              {inferedData?.properties?.Age || inferedData?.Age}
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">AI Confidence:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedData?.properties?.confidence || inferedData?.confidence}
            </span>
          </div>
        </div>
      )}
      {/* Inferred Language Skills  */}
      {inferedLangProficiency && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2">Inferred Language Proficiency</p>
          {inferedLangProficiency?.properties
            ? inferedLangProficiency?.properties?.languageSkills.map(
                (val, index) => (
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
                )
              )
            : inferedLangProficiency.languageSkills.map((val, index) => (
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
      )}
      {/* Inferred Location  */}
      {inferedLocation && (
        <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
          <p className="font-semibold py-2"> Inferred Location</p>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">Location:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedLocation?.properties?.Location ||
                inferedLocation?.Location}
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="w-1/4 inline-block">AI Confidence:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {inferedLocation?.properties?.confidence ||
                inferedLocation?.confidence}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default InferredResult;
