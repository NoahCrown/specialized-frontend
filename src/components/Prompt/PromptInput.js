import React, { useState } from "react";
import axios from "axios";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import RunInBulk from "./RunInBulk";
import socketIOClient from "socket.io-client";

function PromptInput({ prompt, id, onDelete, label }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [responseText, setResponseText] = useState(prompt);
  const [selectedAction, setSelectedAction] = useState("run_prompt");

  const {
    candidateId,
    dataToInfer,
    mode,
    setAgePromptInputs,
    setLanguagePromptInputs,
    setLocationPromptInputs,
    agePrompts,
    languagePrompts,
    locationPrompts,
    setDataLoader,
    setLoaderDetails,
    setOutput,
    promptResult,
    showRunInBulk,
    isRunningInBulk,
    pendingInference,
    completedInference,
    setBulkInferenceData,
    setPending,
    setCompleted,
  } = useCandidate();

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleActionExecute = () => {
    // Handle the submission based on the selected action
    switch (selectedAction) {
      case "run_prompt":
        handleSubmitPrompt();
        break;
      case "run_queue":
        handleRunQueue();
        break;
      case "run_bulk":
        showRunInBulk();
        break;
      default:
        break;
    }
  };

  const handleSocketEvents = (response, socket) => {
    setInterval(() => {
      if (response.data.job_id) {
        socket.emit("check_job", { job_id: response.data.job_id });
      }
    }, 1000); 
    
  
    socket.on("job_complete", (job) => {
      if (job.status === "success") {
        setCompleted(job);
      }
    });
  
    socket.on("job_failed", (job) => {
      console.log("Job failed:", job);
    });
  
    socket.on("job_pending", (job) => {
      console.log("Job pending:", job);
        setPending(job)
  
    });
  };
  

  const handleRunQueue = async () => {
    toast.success("Added inference to the queue.");
    const data = {
      response: responseText,
      candidateId: candidateId,
      dataToInfer: dataToInfer,
      mode: mode,
    };

    try {
      const response = await axios.post("/api/enqueue", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const socket = socketIOClient("http://127.0.0.1:5000");
      console.log(response.data);
      handleSocketEvents(response, socket,)
    } catch (error) {
      console.error("Error enqueuing data:", error);
      toast.warn("Queue inference failed for candidate " + candidateId);
    }
  };

  const handleSubmitPrompt = async () => {
    const data = {
      response: responseText,
      candidateId: candidateId,
      dataToInfer: dataToInfer,
      mode: mode,
    };
    toast.success(`Inferring ${data.dataToInfer}, please wait.`);
    setLoaderDetails("Inferring");
    setDataLoader(true);

    try {
      const response = await axios.post("/api/prompt_input", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newData = {
        ...promptResult,
        ...(dataToInfer === "age" && {
          inferredAge: {
            Age: response.data.Age,
            ageConfidence: response.data.confidence,
          },
        }),
        ...(dataToInfer === "languageSkills" && {
          languageSkills: response.data.languageSkills,
        }),
        ...(dataToInfer === "location" && {
          inferredLocation: {
            Location: response.data.Location,
            locationConfidence: response.data.confidence,
          },
        }),
      };

      setOutput(newData);

      setDataLoader(false);
    } catch (error) {
      console.error("Error:", error);
      toast.warn("Failed to infer data, please try again later.");
      setDataLoader(false);
    }
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
      {isRunningInBulk ? (
        <RunInBulk prompt={prompt} />
      ) : (
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

              <div className="flex items-center justify-between gap-2 px-4">
                <div className="flex ">
                  <button
                    onClick={savePrompt}
                    className="underline font-bold hover:cursor-pointer"
                  >
                    <i class="fa-regular fa-floppy-disk mr-1"></i>
                    Save
                  </button>
                  <h1 className="text-[#919191]">|</h1>
                  <button
                    className="underline font-bold hover:cursor-pointer"
                    onClick={onDelete || deletePrompt}
                  >
                    <i class="fa-regular fa-trash-can mr-1"></i>
                    Delete
                  </button>
                </div>

                <div className="flex justify-center items-center  gap-2 ">
                  <select
                    onChange={handleActionChange}
                    className=" text-md focus:outline-none bg-[#F8F8F8] p-1 border-2 border-solid border-[#EAEAEA] "
                  >
                    <option value="run_prompt">Run Prompt</option>
                    <option value="run_queue">Run in Queue</option>
                    <option value="run_bulk">Run in Bulk</option>
                  </select>
                  <button
                    className="w-[60%] bg-black text-white font-bold py-2 px-4 rounded "
                    onClick={handleActionExecute}
                  >
                    Run
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PromptInput;
