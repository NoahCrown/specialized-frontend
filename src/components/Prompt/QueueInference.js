import React, { useState } from "react";
import { useCandidate } from "../../store/Context";

const QueueInference = () => {
  const [showCompleted, setShowIsCompleted] = useState(false);

  const { pendingInference, completedInference } =
    useCandidate();

  return (
    <div className=" bg-[#F5F5F5] max-w-[100%] pt-4 p-6">
      <div className="flex gap-6">
        <button
          onClick={() => setShowIsCompleted(false)}
          className={`hover:underline text-[1rem] ${
            !showCompleted ? "text-black font-bold underline" : "text-[#919191]"
          } `}
        >
            In Progress
        </button>
        <button
          onClick={() => setShowIsCompleted(true)}
          className={`hover:underline text-[1rem] ${
            showCompleted ? "text-black font-bold underline" : "text-[#919191]"
          } `}
        >
          Completed
        </button>
      </div>
      <div className="pt-4 overflow-auto max-h-[60vh]">
        {showCompleted && completedInference &&
          completedInference.length > 0 &&
          completedInference.map((val, index) => (
            <div className="mb-4 ">
              <p className="w-1/3 inline-block mb-[.30rem]">
                Candidate's Name:
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.name}
              </span>
              <p className="w-1/3 inline-block mb-[.30rem]">Candidate ID:</p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.id}
              </span>
              <p className="w-1/3 inline-block mb-[.30rem]">
                Inference Status:
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.status}
              </span>
              {val?.result?.Age && val?.result?.confidence &&
              <>
              <p className="w-1/3 inline-block mb-[.30rem]">
                Inferred Age: 
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.result.Age}
              </span>
              <p className="w-1/3 inline-block mb-[.30rem]">
                AI Confidence: 
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.result.confidence}
              </span>
              </>
              
                }
              
            </div>
          ))}

        {!showCompleted && pendingInference &&  
          pendingInference.length > 0 &&
          pendingInference.map((val, index) => (
            <div className="mb-4">
              <p className="w-1/3 inline-block mb-[.30rem]">
                Candidate's Name:
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.name}
              </span>
              <p className="w-1/3 inline-block mb-[.30rem]">Candidate ID:</p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.id}
              </span>
              <p className="w-1/3 inline-block mb-[.30rem]">
                Inference Status:
              </p>
              <span className="text-[#919191] w-2/3 inline-block">
                {val.status}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QueueInference;
