import React, { useState, useEffect } from "react";
import { useCandidate } from "../store/Context";
import { loadSavedPrompts, loadPrompts } from "../services/apiServices";

import axios from "axios";

import PromptInput from "./Prompt/PromptInput";
import QueueInference from "./Prompt/QueueInference";
import ResultBulk from "./Prompt/ResultBulk";

const Prompt = () => {
  const {
    dataToInfer,
    setDataInfer,
    setAgePromptInputs,
    setLanguagePromptInputs,
    setLocationPromptInputs,
    agePrompts,
    languagePrompts,
    locationPrompts,
    setSavedPromptsData,
  } = useCandidate();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [unsavedAgePrompts, setUnsavedAgePrompts] = useState([]);
  const [unsavedLangPrompts, setUnsavedLangPrompts] = useState([]);
  const [unsavedLocPrompts, setUnsavedLocPrompts] = useState([]);

  const [showQueue, setShowQueue] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [showBulkResult, setShowBulkResult] = useState(false);

  // Default prompt values for each category
  const defaultPrompts = {
    age: "Your task is to infer the candidate's age and include your confidence in the inferred data. The output should be a JSON object only, formatted according to the provided example. Populate the values in this JSON object, and ensure that only the JSON object is returned. The candidate's date of birth is in epoch timestamp format. Do not provide any explanations, sample data, or additional information. Return only the JSON object with the appropriate values inserted.",
    
    languageSkills: "Your task is to infer the candidate's proficiency in English and Japanese, including your confidence in the inferred data. The output should be a JSON object only, formatted according to the provided example. Populate the values in this JSON object, and ensure that only the JSON object is returned. Do not include any explanations, sample data, or additional information. Return only the JSON object with the appropriate values inserted.",
    
    location: "Your task is to infer the candidate's location and include your confidence in the inferred data. The output should be a JSON object only, formatted according to the provided example. Populate the values in this JSON object, and ensure that only the JSON object is returned. Do not provide explanations, sample data, or any other additional information. Only return the JSON object with the appropriate values inserted.",
};


  const handleOnChange = async (event) => {
    const val = event.target.value;
    await setDataInfer(val);
  };

  useEffect(() => {
    const loadPromptData = async () => {
      try {
        const response = await loadPrompts();

        console.log(response.data);

        if (response.data) {
          await setSavedPromptsData(response.data);
          const { age, languageSkills, location } = response.data;

          const agePromptsArray = await Promise.all(
            age.map(async (id) => {
              const dataPrompt = await loadSavedPrompts("age", id);
              return (
                <PromptInput
                  id={id}
                  key={`age${id}`}
                  prompt={dataPrompt || defaultPrompts.age}
                  label={id}
                />
              );
            })
          );
          setAgePromptInputs(agePromptsArray);

          const langPromptsArray = await Promise.all(
            languageSkills.map(async (id) => {
              const dataPrompt = await loadSavedPrompts("languageSkills", id);
              return (
                <PromptInput
                  id={id}
                  key={`lang${id}`}
                  prompt={dataPrompt || defaultPrompts.languageSkills}
                  label={id}
                />
              );
            })
          );
          setLanguagePromptInputs(langPromptsArray);

          const locPromptsArray = await Promise.all(
            location.map(async (id) => {
              console.log(id);

              const dataPrompt = await loadSavedPrompts("location", id);
              return (
                <PromptInput
                  id={id}
                  key={`loc${id}`}
                  prompt={dataPrompt || defaultPrompts.location}
                  label={id}
                />
              );
            })
          );
          setLocationPromptInputs(locPromptsArray);
        }
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

    loadPromptData();
  }, [dataToInfer]);

  const addPromptInput = () => {
    if (dataToInfer === "age") {
      const newIndex = unsavedAgePrompts.length;
      setUnsavedAgePrompts([
        ...unsavedAgePrompts,
        <PromptInput
          key={newIndex}
          index={newIndex}
          prompt={defaultPrompts.age} // Initialize with default prompt
          onDelete={deleteUnsavedPrompt}
        />,
      ]);
    } else if (dataToInfer === "languageSkills") {
      const newIndex = unsavedLangPrompts.length;
      setUnsavedLangPrompts([
        ...unsavedLangPrompts,
        <PromptInput
          key={newIndex}
          index={newIndex}
          prompt={defaultPrompts.languageSkills} // Initialize with default prompt
          onDelete={deleteUnsavedPrompt}
        />,
      ]);
    } else if (dataToInfer === "location") {
      const newIndex = unsavedLocPrompts.length;
      setUnsavedLocPrompts([
        ...unsavedLocPrompts,
        <PromptInput
          key={newIndex}
          index={newIndex}
          prompt={defaultPrompts.location} // Initialize with default prompt
          onDelete={deleteUnsavedPrompt}
        />,
      ]);
    }
  };

  const deleteUnsavedPrompt = (index) => {
    if (dataToInfer === "age") {
      setUnsavedAgePrompts(unsavedAgePrompts.filter((_, i) => i !== index));
    } else if (dataToInfer === "languageSkills") {
      setUnsavedLangPrompts(unsavedLangPrompts.filter((_, i) => i !== index));
    } else if (dataToInfer === "location") {
      setUnsavedLocPrompts(unsavedLocPrompts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-[#F5F5F5]  pt-0 flex flex-col justify-start w-[37.5%] no-scrollbar overflow-scroll max-h-[100vh]  min-h-[100vh] ">
      <div className=" flex flex-col gap-6 border border-solid border-b-[.2rem] border-t-[.2rem] border-r-0 border-l-0 p-6">
        <div
          onClick={() => setShowPromptInput(!showPromptInput)}
          className="flex justify-between gap-5 items-center "
        >
          <button className="text-3xl font-bold">Prompt</button>
          <div className="flex justify-center items-center gap-6">
            <button onClick={() => setShowPromptInput(!showPromptInput)}>
              <i
                className={`fa-solid fa-angle-${
                  showPromptInput ? "up" : "down"
                }`}
              ></i>
            </button>
          </div>
        </div>
        {showPromptInput && (
          <div>
            <div className="flex justify-start items-center mb-4 gap-1">
              <select
                className=" w-1/2 border border-[#ababab] border-dashed text-[#ababab] text-center hover:border-black hover:text-black hover:cursor-pointer p-1 "
                value={dataToInfer}
                defaultValue="age"
                onChange={handleOnChange}
              >
                <option value="" disabled selected>
                  Select a data to infer
                </option>
                <option value="age">Age</option>
                <option value="languageSkills">Language Skills EN</option>
                <option value="location">Location</option>
              </select>
              <button
                onClick={addPromptInput}
                className=" text-black bg-[#F5F5F5] w-1/3 rounded-md  hover:border-black hover:text-black hover:cursor-pointer font-semibold "
              >
                <i className="fa-solid fa-circle-plus mr-1"></i> Add new prompt
              </button>
            </div>
            <div>
              {dataToInfer === "age" && (
                <div>
                  {agePrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                  {unsavedAgePrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                </div>
              )}

              {dataToInfer === "languageSkills" && (
                <div>
                  {languagePrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                  {unsavedLangPrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                </div>
              )}
              {dataToInfer === "location" && (
                <div>
                  {locationPrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                  {unsavedLocPrompts.map((prompt, index) => (
                    <div key={index}>{prompt}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prompt;
