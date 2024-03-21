import React, {useState} from 'react';
import Select from "react-select";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import { filterDataByMissingFields } from '../../services/apiServices'; // Ensure this is imported

const SearchbyMissingData = () => {
    const {
        setSearchData,
    } = useCandidate();
    const [missingDataToSearch, setMissingDataToSearch] = useState(null);


    const options = [
        { value: "age", label: "Age" },
        { value: "languageSkillsEN", label: "Language Skills EN" },
        { value: "languageSkillsJP", label: "Language Skills JP" },
        { value: "location", label: "Location" },
        // Removed the empty object as it doesn't seem to serve a purpose
    ];

    const handleMissingDataSearch = async (event, { action }) => {
        action === "clear" && handleClearSearch();
        const selectedValues = event ? event.map(option => option.value) : [];
        setMissingDataToSearch(selectedValues);
    };

    const handleSearch = async () => {
        try {
            const data = await filterDataByMissingFields(missingDataToSearch);
            setSearchData(data);
        } catch (error) {
            // Error handling is already done in filterDataByMissingFields
        }
    };

    const handleClearSearch = () => {
        setSearchData([]);
        setMissingDataToSearch([]);
        toast.success("Cleared search");
    };

    return (
        <div className="flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]">
            <label className="text-[.80rem] text-[#8F8F8F] w-full text-left">Search by missing data</label>
            <form className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2">
                <Select
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select w-full"
                    classNamePrefix="select"
                    onChange={handleMissingDataSearch}
                    defaultValue={[]} // Updated to make it clear it starts with no selection
                />
            </form>
            <button
                className="bg-black text-white w-full rounded-md p-2 hover:cursor-pointer"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchbyMissingData;
