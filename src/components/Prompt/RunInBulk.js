import React, { useState } from 'react'
import { useCandidate } from '../../store/Context';
import axios from "axios";
import BulkInferenceCandidate from './BulkInferenceCandidate';
import {toast} from 'react-toastify'




const RunInBulk = ({prompt}) => {
    const [inferInBulk, setInferInBulk] = useState(null)
    const {showRunInBulk, dataToInfer, bulkInference,
      setBulkInferenceData} = useCandidate();
    console.log(prompt)
      console.log(bulkInference)
    const handleRunInferenceBulk = async() => {
      setBulkInferenceData(null)
      toast.success('Running bulk inference, please wait')
      try {
        const response = await axios.post('/api/bulk_prompt_input', {
          response: prompt ,
          dataToInfer: dataToInfer,
        });
        console.log(response)
        setBulkInferenceData(response.data)
        toast.success('Bulk inference success!')
      } catch (err) {
        console.log(err);
        toast.warn('Something went wrong, please try again')
      }

    }
  return (
    <div>
    <h1 className='text-black text-3xl text-left font-bold mb-5'>Bulk Inference</h1>
    <p className='text-black font-semibold	'>Select data to run in bulk:</p>

    <div className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2">
  <select
    value={inferInBulk}
    onChange={(e) => setInferInBulk(e.target.value)}
    className="w-[95%] text-sm focus:outline-none bg-[#F5F5F5] p-1"
  >
    <option value="option1">Age</option>
    <option value="option2">Language Skills</option>
    <option value="option3">Location</option>
    {/* Add more options as needed */}
  </select>
  <i className="fa-solid fa-x w-[5%] hover:cursor-pointer"></i>
</div>



<div className='flex justify-between items-center gap-4 border-solid border-b-2 border-[#E7E7E7] pb-6 mb-6'>
<button className='w-1/2 border border-black border-solid text-black rounded-md hover:border-black hover:text-black hover:cursor-pointer mt-6 p-2' onClick={showRunInBulk}>Cancel</button>

<button className="w-1/2  bg-black text-white rounded-md font-semibold mt-6 p-2" onClick={handleRunInferenceBulk}>Run inferrence bulk</button>


</div>
<div className='overflow-auto max-h-[85vh]'>
  {bulkInference && bulkInference.map((val, index) => (
    <BulkInferenceCandidate 
    key={index} 
    name={val.name} 
    id={val.id} 
    status={val.status} 
    inferredAge={val.Age} 
    ageConfidence={val.confidence} 
    inferredLang= {val.languageSkills}
    inferedLocation = {val.Location}
    locationConfidence = {val.confidence}
    />
  ))}
</div>


    </div>
  )
}

export default RunInBulk
