import React, { useState } from "react";
import { useCandidate } from "../../store/Context";
import ParserInfo from "../Output/ParserInfo";
import axios from "axios";
import { toast } from "react-toastify";

const OutputButtons = () => {
  const {
    promptResult,
    resumeFiles,
    handleOpenPdfInNewTab,
    showPushingModal,
    mode,
    selectedFile,
    candidateId,
    setResume,
    setDataLoader,
  } = useCandidate();

  const [isCVFileSelectorVisible, setIsCVFileSelectorVisible] = useState(false);
  const setToggleFileList = async () => {
    setIsCVFileSelectorVisible(!isCVFileSelectorVisible);

    if (!resumeFiles) {
      setDataLoader(true);
      try {
        const responsePDF = await axios.post("/api/get_pdf", {
          candidateId: candidateId,
          mode: "bullhorn",
        });
        await setResume(responsePDF.data.files);
        setDataLoader(false);
      } catch (error) {
        console.error(error);
        setDataLoader(false);
        toast.warn("Error: Data unavailable, please try again.");
      }
    }
  };

  const openFileInNewTab = (selectedFile) => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <>
      <div className="flex flex- justify-between items-center mb-5">
        <div className="">
          <h1 className="text-3xl font-bold">Output</h1>
        </div>
        {promptResult && (
          <>
            <div className="flex gap-4 w-[60%]">
              <button
                onClick={
                  mode === "CV"
                    ? () => openFileInNewTab(selectedFile)
                    : setToggleFileList
                }
                className="border border-black border-solid text-black font-bold bg-[#F5F5F5] w-1/2 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
              >
                <i class="fa-regular fa-eye"></i> View CV
              </button>
              <button
                className="w-1/2 bg-black text-white rounded-md"
                onClick={showPushingModal}
              >
                Push to Bullhorn
              </button>
            </div>
          </>
        )}
      </div>
      {isCVFileSelectorVisible === true && Array.isArray(resumeFiles) && (
        <div className="border-4 border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
          <p className="text-[.80rem] text-[#8F8F8F] w-full text-left block mb-2">
            Candidate Files:
          </p>
          <div className="flex gap-4 justify-start flex-wrap items-center">
            {resumeFiles.map((val, index) => (
              <div className="flex justify-center items-center gap-9 min-w-[100%] max-w">
                <div className="rounded-full bg-[#D3D3D3] min-w-[8%] max-w-[8%] flex justify-center items-center p-2">
                  <img
                    src={require("../../assets/pdf_icon.png")}
                    alt="pdf-icon"
                    className=" min-w-[65%] max-w-[65%]"
                  />
                </div>
                <p className="min-w-[65%] max-w-[65%]"> {val.fileName}</p>
                <button
                  className="min-w-[10%] max-w-[10%] font-bold underline"
                  onClick={() => handleOpenPdfInNewTab(val.candidateFile)}
                  key={index}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <ParserInfo />
    </>
  );
};

export default OutputButtons;
