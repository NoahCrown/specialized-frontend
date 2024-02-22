import React from 'react'
import Select from "react-select";
import { useCandidate } from "../../store/Context";



const SearchbyMissingData = () => {
    const {
        setSearchMissingData
      } = useCandidate();

    
  const options = [
    { value: "age", label: "Age" },
    { value: "languageSkills", label: "languageSkill" },
    { value: "location", label: "location" },
  ];

    const handleMissingDataSearch = (event) => {
        const selectedValues = Array.from(event, (option) => option.value);
        console.log(selectedValues);
        setSearchMissingData(selectedValues);
      };
  return (
    <div className="flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]">
          <label className="text-[.80rem] text-[#8F8F8F] w-full text-left">
            Search by missing data
          </label>
          <form className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2">
            <Select
              defaultValue={[options[2], options[3]]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={handleMissingDataSearch}
            />
          </form>
          <button
            className="bg-black text-white w-full rounded-md p-2 hover:cursor-pointer "
          >
            Search
          </button>
        </div>
  )
}

export default SearchbyMissingData