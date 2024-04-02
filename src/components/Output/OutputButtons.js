import React, { useState } from "react";
import { useCandidate } from "../../store/Context";
import ParserInfo from "../Output/ParserInfo";
import { fetchPDFs } from "../../services/apiServices"; // Import the service

const OutputButtons = () => {
  const {
    promptResult,
    resumeFiles,
    handleOpenPdfInNewTab,
    showPushingModal,
    mode,
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
        const files = await fetchPDFs(candidateId, mode);
        setResume(files);
      } catch (error) {
        // Error handling is done in fetchPDFs
      } finally {
        setDataLoader(false);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Output</h1>

      <div className="flex flex- justify-between items-center mb-5 border-b-2 border-[#E7E7E7] pb-4">

        {promptResult && (
          <>
            <div className="flex justify-between items-center gap-4 px-4 w-[100%]">
            <p className="text-[#7E7E7E]">Select inferred data to be pushed.</p>

              <button
                className="w-1/3 bg-black py-3 px-4 text-white rounded-md"
                onClick={showPushingModal}
              >
                Push to Bullhorn
              </button>
            </div>
          </>
        )}
      </div>

      <ParserInfo />
      {promptResult && <div className="flex justify-between border-[3px] border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
      <p className="text-[#919191] italic text-[1rem]"> View candidate's files. </p>
        <button
          onClick={setToggleFileList}
          className="border border-black border-solid text-black font-bold bg-[#F5F5F5] w-1/3 rounded-md px-[.8rem] py-[.4rem] hover:border-black hover:text-black hover:cursor-pointer"
        >
          <i class="fa-regular fa-eye"></i> View CV
        </button>

      </div> }
      
      
      {isCVFileSelectorVisible === true && Array.isArray(resumeFiles) && (
        <div className="border-4 border-solid border=[#919191] px-4 py-2 rounded-md items-center mb-2">
          <p className="text-[.80rem] text-[#8F8F8F] w-full text-left block mb-2">
            Candidate Files:
          </p>
          <div className="flex gap-4 justify-start flex-wrap items-center">
            {resumeFiles.map((val, index) => (
              <div className="flex justify-center items-center gap-9 min-w-[100%] max-w">
               
                  <img
                    src={require(val.fileName.includes('.docx') ? '../../assets/docx.png' : '../../assets/pdf.png')}
                    alt="pdf-icon"
                    className=" min-w-[6%] max-w-[6%]"
                  />

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
    </>
  );
};

export default OutputButtons;
