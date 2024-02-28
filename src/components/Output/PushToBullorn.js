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
        <dialog open id="modal" className=" flex flex-col gap-2 absolute min-w-[40%]  max-w-[40%] min-h-[55vh] py-[2rem] px-[3rem] border-0 rounded-lg text-black">
         <h1 className='text-black text-3xl text-left font-bold mb-5'>Push To Bullhorn</h1>
         <p className='text-black font-semibold	'>Select inferred data to be pushed:</p>
         <Select
              defaultValue={[options[2], options[3]]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={handleChangeDataToBePushed}

            />
        <p className='font-semibold'>Name of Candidate: </p>
        <span>{promptResult[0].firstName + ' ' + promptResult[0].lastName }</span>
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
        <div className='flex justify-between items-center mt-10 border-solid border-t-2 border-[#E7E7E7] w-full px-2 py-2'>
        <button className='underline font-semibold mt-6' onClick={showPushingModal}>Cancel</button>
        <button className="w-1/3 p-2 bg-black text-white rounded-md font-semibold mt-6" onClick={showPushingModal}>Push To Bullhorn</button>



        </div>

        </dialog>
      </div>
    </div>
  )
}

export default PushToBullorn
