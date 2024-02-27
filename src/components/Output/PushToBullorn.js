import React, { useState } from 'react'
import { useCandidate } from '../../store/Context';
import Select from "react-select";




const PushToBullorn = () => {
    const {showPushingModal, inferedData, inferedLangProficiency, inferedLocation, promptResult } = useCandidate();
    console.log(inferedData, inferedLangProficiency, inferedLocation)
    const [dataToBePushed, setDataToBePushed] = useState(null)
    const options = [
        { value: "age", label: "Age" },
        { value: "languageSkills", label: "Language Skills" },
        { value: "location", label: "Location" },
      ];

      const handleChangeDataToBePushed = async(event,{ action }) => {
        // action === "clear" && handleClearSearch() ;
        const selectedValues = Array.from(event, (option) => option.value);
          console.log(selectedValues);
          await setDataToBePushed(selectedValues);
        };

  return (
    <div className="absolute flex justify-center items-center w-full  min-h-[149vh] backdrop-blur-sm backdrop-brightness-50	 z-50">
      <div className="absolute flex justify-center w-full h-1/2">
        <dialog open id="modal" className=" flex flex-col justify-center gap-2 absolute min-w-[45%] max-w-[45%] min-h-[55vh] max-h-[55vh] m p-[2rem] border-0 rounded-lg text-[#919191]">
         <h1 className='text-black text-2xl text-center'>Push To Bullhorn</h1>
         <Select
              defaultValue={[options[2], options[3]]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={handleChangeDataToBePushed}

            />
        <p className='font-bold'>Name of Candidate: </p>
        <span>{promptResult[0].firstName}</span>
        <p className='font-bold'>Inferred Data To be Pushed: </p>
        {dataToBePushed?.includes('age') && 
        <>
        <p>Inferred Age: {inferedData ? inferedData.Age : 'No Data Avaiable, please infer before pushing.'} </p>
        <p>Inferred Age AI Confidence: {inferedData ? inferedData.confidence : 'No Data Avaiable, please infer before pushing.'}</p>

        </>}

        {dataToBePushed?.includes('location') && 
        <>
        <p>Inferred Location: {inferedLocation ? inferedLocation.Location : 'No Data Avaiable, please infer before pushing.'} </p>
        <p>Inferred Location AI Confidence: {inferedLocation ? inferedLocation.confidence : 'No Data Avaiable, please infer before pushing.'}</p>

        </>}

        {dataToBePushed?.includes('languageSkills') && 
        <>
        <p>Inferred Language Skills: {inferedLangProficiency ? inferedLangProficiency.languageSkills : 'No Data Avaiable, please infer before pushing.'} </p>
        <p>Inferred Language Skills AI Confidence: {inferedLangProficiency ? inferedLangProficiency.confidence : 'No Data Avaiable, please infer before pushing.'}</p>

        </>}

         <button onClick={showPushingModal}>Close</button>
        </dialog>
      </div>
    </div>
  )
}

export default PushToBullorn
