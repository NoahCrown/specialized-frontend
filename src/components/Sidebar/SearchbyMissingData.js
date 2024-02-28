import React from 'react'
import Select from "react-select";
import { useCandidate } from "../../store/Context";
import axios from 'axios';
import { toast } from "react-toastify";



const SearchbyMissingData = () => {
    const {
        setSearchMissingData,
        missingDataToSearch,
        setSearchData
      } = useCandidate();

    
      const options = [
        { value: "age", label: "Age" },
        { value: "languageSkillsEN", label: "Language Skills EN" },
        { value: "languageSkillsJP", label: "Language Skills JP" },
        { value: "location", label: "Location" },
        {}
      ];

    const handleMissingDataSearch = async(event,{ action }) => {
      action === "clear" && handleClearSearch() ;
      const selectedValues = Array.from(event, (option) => option.value);
        console.log(selectedValues);
        await setSearchMissingData(selectedValues);
      };

      const handleSearch = () => {
        console.log(missingDataToSearch)
        // Make a POST request to the API using Axios
        axios
          .post("/api/filter_data", 
          { missingFields: missingDataToSearch,
           },

          )
          .then((response) => {
            // Handle the successful response
            setSearchData(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            // Handle errors here
            console.error(error);
          });
      };


    const handleClearSearch = () => {
        setSearchData([]);
        setSearchMissingData(null)
        toast.success("Cleared search");
        // console.log('ty')
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
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
  )
}

export default SearchbyMissingData