import React, { useState } from "react";
import axios from "axios";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";

function PromptInput({ prompt, id, onDelete, label }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [responseText, setResponseText] = useState(prompt);
  const {
    candidateId,
    dataToInfer,
    setInfered,
    setInferedLang,
    setInferedLoc,
    mode,
    setAgePromptInputs,
    setLanguagePromptInputs,
    setLocationPromptInputs,
    agePrompts,
    languagePrompts,
    locationPrompts,
    setDataLoader,
    setLoaderDetails,
    setInferedOffshorly,
    setInferedLangOffshorly,
    setInferedLocOffshorly
  } = useCandidate();

  const handleSubmitPropmpt = async () => {
    const data = {
      response: responseText,
      candidateId: candidateId,
      dataToInfer: dataToInfer,
      mode: mode,
    };
    toast.success(`Inferring ${data.dataToInfer}, please wait.`);
    setLoaderDetails("Inferring");
    setDataLoader(true);

    await axios
      .post("/api/prompt_input", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(mode)
        if (mode === "bullhorn"){
          if (response.data && dataToInfer === "age") {
            setInfered(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Age Data.");
          } else if (response.data && dataToInfer === "languageSkills") {
            setInferedLang(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Language Proficiency Data.");
          } else if (response.data && dataToInfer === "location") {
            setInferedLoc(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Location Data.");
          }

        }else if (mode === 'CV_bullhorn'){
          if (response.data && dataToInfer === "age") {
            setInferedOffshorly(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Age Data.");
          } else if (response.data && dataToInfer === "languageSkills") {
            setInferedLangOffshorly(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Language Proficiency Data.");
          } else if (response.data && dataToInfer === "location") {
            setInferedLocOffshorly(response.data);
            setDataLoader(false);
            toast.success("Successfully inferred Location Data.");
          }

        }

        console.log(response)
        
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
          toast.warn("Failed to infer data, please try again later.");
          setDataLoader(false);

        }
      });
  };

  const savePrompt = async () => {
    try {
      const data = { response: responseText, dataToInfer: dataToInfer };
      const response = await axios.post("/api/save_prompt", data);
      toast.success("Prompt successfully saved.");
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast.warn("Failed to save prompt");
    }
  };

  const deletePrompt = async () => {
    try {
      const data = { dataToInfer: dataToInfer };
      const response = await axios.post(`/api/delete_prompt/${id}`, data);
      console.log("Prompt deleted successfully:", response.data);

      const promptIndexToDelete = id;

      if (dataToInfer === "age") {
        setAgePromptInputs(
          agePrompts.filter((_, index) => index !== promptIndexToDelete)
        );
      } else if (dataToInfer === "languageSkills") {
        setLanguagePromptInputs(
          languagePrompts.filter((_, index) => index !== promptIndexToDelete)
        );
      } else if (dataToInfer === "location") {
        setLocationPromptInputs(
          locationPrompts.filter((_, index) => index !== promptIndexToDelete)
        );
      }

      toast.success("Prompt successfully deleted.");
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast.error("Failed to delete prompt.");
    }
  };

  return (
    <>
      <div className="relative bg-white text-black">
        <div
          onClick={() => setTextboxVisible(!isTextboxVisible)}
          className={`cursor-pointer border-solid border-2 border-[#D1D5DB] px-10  p-4 gap-2 rounded text-black flex flex-row justify-between items-center  : ''
          }`}
        >
          <div className="rounded-full bg-[#CECECE] w-[8%] flex justify-center items-start p-2 ">
            <img
              src={require("../../assets/pdf_icon.png")}
              alt="pdf-icon"
              className="w-[60%]"
            />
          </div>
          <input
            className="focus:outline-none"
            placeholder={`Version ${label}`}
          />
          {isTextboxVisible ? (
            <i className="fa-solid fa-minus"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </div>
        {isTextboxVisible && (
          <div className="relative left-0 mt-2 p-2 bg-white rounded text-black w-full">
            <textarea
              className="w-full h-[60vh] border border-gray-300 rounded p-2"
              defaultValue={responseText}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />

            <div className="flex items-center justify-between px-4">
              <p
                onClick={savePrompt}
                className="underline font-bold hover:cursor-pointer"
              >
                Save
              </p>
              <button onClick={onDelete || deletePrompt}>
                <i class="fa-solid fa-trash"></i>
              </button>
              <button
                className="my-3 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                onClick={handleSubmitPropmpt}
              >
                Rerun
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PromptInput;
