import React from "react";

const BulkInferenceCandidate = ({
  name,
  id,
  status,
  inferredAge,
  ageConfidence,
  inferredLang,
  inferedLocation,
  locationConfidence,
}) => {
  console.log(inferredLang);
  return (
    <div className="mb-4">
      <p className="w-1/3 inline-block mb-[.30rem]">Candidate's Name:</p>
      <span className="text-[#919191] w-2/3 inline-block">{name}</span>
      <p className="w-1/3 inline-block mb-[.30rem]">Candidate ID:</p>
      <span className="text-[#919191] w-2/3 inline-block">{id}</span>
      <p className="w-1/3 inline-block mb-[.30rem]">Inference Status:</p>
      <span className="text-[#919191] w-2/3 inline-block">{status}</span>

      {inferredAge && ageConfidence ? (
        <>
          <p className="w-1/3 inline-block mb-[.30rem]">Inferred Age:</p>
          <span className="text-[#919191] w-2/3 inline-block">
            {inferredAge}
          </span>
          <p className="w-1/3 inline-block mb-[.30rem]">AI Confidence:</p>
          <span className="text-[#919191] w-2/3 inline-block">
            {ageConfidence}
          </span>
        </>
      ) : (
        ""
      )}

      {inferedLocation && locationConfidence ? (
        <>
          <p className="w-1/3 inline-block mb-[.30rem]">Inferred Location:</p>
          <span className="text-[#919191] w-2/3 inline-block">
            {inferedLocation}
          </span>
          <p className="w-1/3 inline-block mb-[.30rem]">AI Confidence:</p>
          <span className="text-[#919191] w-2/3 inline-block">
            {locationConfidence}
          </span>
        </>
      ) : (
        ""
      )}


      {inferredLang
        ? inferredLang.map((val, index) => (
            <div className="mb-2" key={index}>
              <div className="flex flex-wrap items-center">
                <p className="w-1/3 inline-block mb-[.30rem]">Language:</p>
                <span className="text-[#919191] w-2/3 inline-block">
                  {val.Language}
                </span>
              </div>
              <div className="flex flex-wrap items-center">
                <p className="w-1/3 inline-block mb-[.30rem]">Confidence:</p>
                <span className="text-[#919191] w-2/3 inline-block">
                  {val.confidence}
                </span>
              </div>
              <div className="flex flex-wrap items-center">
                <p className="w-1/3 inline-block mb-[.30rem]">Proficiency:</p>
                <span className="text-[#919191] w-2/3 inline-block">
                  {val.enProficiency || val.jpProficiency}
                </span>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default BulkInferenceCandidate;
