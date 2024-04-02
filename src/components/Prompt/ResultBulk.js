import React from 'react'
import BulkInferenceCandidate from "./BulkInferenceCandidate";
import { useCandidate } from "../../store/Context";
import NoData from '../Output/NoData';


const ResultBulk = () => {
    const {bulkInference} =
    useCandidate();
    console.log(bulkInference)
  return (
    <div className='p-4'>
    <div className="overflow-auto max-h-[40vh] p-2">
      {bulkInference ? bulkInference &&
          bulkInference.map((val, index) => (
            <BulkInferenceCandidate
              key={index}
              name={val.name}
              id={val.id}
              status={val.status}
              inferredAge={val.Age}
              ageConfidence={val.confidence}
              inferredLang={val.languageSkills}
              inferedLocation={val.Location}
              locationConfidence={val.confidence}
            />
          )) : <NoData/> }

      </div>
      
    </div>
  )
}

export default ResultBulk
