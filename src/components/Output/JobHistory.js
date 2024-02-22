import React from 'react'
import { useCandidate } from "../../store/Context";


const JobHistory = () => {
    const {
        promptResult,
        epochToDateString
      } = useCandidate();
  return (
    <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
    <p className="text-black py-2 font-semibold">Job History</p>
    {Array.isArray(promptResult[1]?.workHistory)
      ? promptResult[1].workHistory.map((val, index) => (
          <div className="mb-4" key={index}>
            <p className="w-1/4 inline-block align-top">Company Name: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.companyName || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Job Title: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.title || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Start date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.startDate
                ? isNaN(val.startDate)
                  ? val.startDate
                  : epochToDateString(val.startDate)
                : "N/A"}
            </span>
            <p className="w-1/4 inline-block">End date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.endDate
                ? isNaN(val.endDate)
                  ? val.endDate
                  : epochToDateString(val.endDate)
                : "N/A"}
            </span>
            <p className="w-1/4 inline-block align-top">Comments: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.comments}
            </span>
          </div>
        ))
      : Array.isArray(promptResult[1])
      ? promptResult[1].map((val, index) => (
          <div className="mb-4" key={index}>
            <p className="w-1/4 inline-block align-top">Company Name: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.companyName || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Job Title: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.title || "N/A"}
            </span>
            <p className="w-1/4 inline-block">Start date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.startDate
                ? isNaN(val.startDate)
                  ? val.startDate
                  : epochToDateString(val.startDate)
                : "N/A"}
            </span>
            <p className="w-1/4 inline-block">End date: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.endDate
                ? isNaN(val.endDate)
                  ? val.endDate
                  : epochToDateString(val.endDate)
                : "N/A"}
            </span>
            <p className="w-1/4 inline-block align-top">Comments: </p>
            <span className="text-[#919191] w-3/4 inline-block">
              {val.comments || "N/A"}
            </span>
          </div>
        ))
      : "N/A"}
  </div>

  )
}

export default JobHistory
