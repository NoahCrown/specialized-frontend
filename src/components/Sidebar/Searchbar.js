import React, { useState } from 'react';
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import { searchByName } from '../../services/apiServices'; // Ensure this is correctly imported

const Searchbar = () => {
    const [inputValue, setInputValue] = useState("");
    const { setSearchData } = useCandidate();

    const handleSearch = async () => {
        try {
            const data = await searchByName(inputValue);
            setSearchData(data);
        } catch (error) {
            // Error handling is already done in searchByName
        }
    };

    const handleClearSearch = () => {
        setSearchData([]);
        setInputValue("");
        toast.success("Cleared search");
    };

    return (
        <div className="flex justify-center items-center flex-col gap-2 w-[80%] py-4 border-solid border-b-2 border-[#E7E7E7]">
            <label className="text-[.80rem] text-[#8F8F8F] w-full text-left">Search by name</label>
            <div className="border-solid border-2 border-[#E7E7E7] w-full flex flex-row justify-between items-center gap-4 p-2">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-[90%] text-sm focus:outline-none"
                    placeholder="Search for a job position or name..."
                />
                <i onClick={handleClearSearch} className="fa-solid fa-x w-[10%] hover:cursor-pointer"></i>
            </div>
            <button
                onClick={handleSearch}
                className="bg-black text-white w-full rounded-md p-2 hover:cursor-pointer"
            >
                Search
            </button>
        </div>
    );
}

export default Searchbar;
