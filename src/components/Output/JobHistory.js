import React from 'react'
import { useCandidate } from "../../store/Context";


const JobHistory = () => {
    const {
        promptResult,
        epochToDateString
      } = useCandidate();
      console.log(promptResult[1])

      const splitString = (comment) => {
        if (!comment) {
          return 'N/A';
        }else if (Array.isArray(comment)){
          return comment
        }
      
        // Define an array of delimiters
        const delimiters = ['·', '•', ';', '●', '○', '\n'];
      
        // Function to split and filter comment
        const splitAndFilterComment = (comment, delimiters) => {
          let parts = [comment]; // Start with the whole comment as a single part
      
          // Iterate through each delimiter
          delimiters.forEach(delimiter => {
            // Split each part using the delimiter and flatten the resulting array
            parts = parts.flatMap(part => part.split(delimiter));
          });
      
          // Filter out empty strings and trim each part
          parts = parts.filter(item => item.trim() !== "");
      
          return parts;
        };
      
        // Split and filter the comment
        const parts = splitAndFilterComment(comment, delimiters);
      
        // Render the parts
        return (
          <>
            {parts.map((val, index) => (
              <li key={index} className='disc'>{val}</li>
            ))}
          </>
        );
      };
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
              {splitString(val.comments)}
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
            {splitString(val.comments)}

            </span>
          </div>
        ))
      : "N/A"}
  </div>

  )
}

export default JobHistory
