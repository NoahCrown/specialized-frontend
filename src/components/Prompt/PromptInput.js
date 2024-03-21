import React, { useState } from "react";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { enqueueData, submitPrompt, savePrompt, deletePrompt } from '../../services/apiServices'; // Import the service functions
import { runBulkInference } from '../../services/apiServices'; // Ensure this is imported

function PromptInput({ prompt, id, onDelete, label }) {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [responseText, setResponseText] = useState(prompt);
  const [selectedAction, setSelectedAction] = useState("run_prompt");

  const {
    candidateId,
    dataToInfer,
    mode,
    setDataLoader,
    setLoaderDetails,
    setOutput,
    promptResult,

    setPending,
    setCompleted,
    setBulkInferenceData
  } = useCandidate();

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleActionExecute = () => {
    switch (selectedAction) {
      case "run_prompt":
        handleSubmitPrompt();
        break;
      case "run_queue":
        handleRunQueue();
        break;
      case "run_bulk":
        handleRunInferenceBulk();
        break;
      default:
        break;
    }
  };

  const handleSocketEvents = (response, socket) => {
    if (response.job_id) {
      setInterval(() => {
        socket.emit("check_job", { job_id: response.job_id });
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
        setPending(job);
      });
    }
  };

  const handleRunQueue = async () => {
    const data = {
      response: responseText,
      candidateId: candidateId,
      dataToInfer: dataToInfer,
      mode: mode,
    };

    try {
      const responseData = await enqueueData(data);
      const socket = socketIOClient("http://127.0.0.1:5000");
      handleSocketEvents(responseData, socket);
    } catch (error) {
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
    setDataLoader(true);
    setLoaderDetails("Inferring");

    try {
      const responseData = await submitPrompt(data);
      const newData = {
        ...promptResult,
        ...(dataToInfer === "age" && { inferredAge: { Age: responseData.Age, ageConfidence: responseData.confidence } }),
        ...(dataToInfer === "languageSkills" && { languageSkills: responseData.languageSkills }),
        ...(dataToInfer === "location" && { inferredLocation: { Location: responseData.Location, locationConfidence: responseData.confidence } }),
      };
      setOutput(newData);
      setDataLoader(false);
    } catch (error) {
      setDataLoader(false);
    }
  };

  const handleSavePrompt = async () => {
    // Prepare the data object correctly according to your backend expectations
    const data = { id, response: responseText, dataToInfer };
    try {
      await savePrompt(data);
    } catch (error) {
      // Error handling is already done in the service
    }
  };

  const handleRunInferenceBulk = async () => {
    toast.success('Running candidates on bulk, this may take a while.')
    try {
      const data = await runBulkInference(prompt, dataToInfer);
      setBulkInferenceData(data);
      toast.success("Bulk inference success!");
    } catch (error) {
      toast.warn('Bulk inference failed. Please try again.')
      // The toast error handling is already done in runBulkInference
    } finally {

    }
  };

  const handleDeletePrompt = async () => {
    try {
      if (onDelete) onDelete(id);
      await deletePrompt(id, dataToInfer);
      // Call onDelete prop or any state update function here if necessary
    } catch (error) {
      // Error handling is already done in the service
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

              <div className="flex items-center justify-between gap-2 px-4">
                <div className="flex ">
                  <button
                    onClick={handleSavePrompt}
                    className="underline font-bold hover:cursor-pointer"
                  >
                    <i class="fa-regular fa-floppy-disk mr-1"></i>
                    Save
                  </button>
                  <h1 className="text-[#919191]">|</h1>
                  <button
                    className="underline font-bold hover:cursor-pointer"
                    onClick={handleDeletePrompt}
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

    </>
  );
}

export default PromptInput;
