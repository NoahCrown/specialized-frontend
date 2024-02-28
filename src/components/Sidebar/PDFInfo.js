import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCandidate } from "../../store/Context";
const PDFInfo = ({ id, first_name, last_name, status, active }) => {
  const {
    setCandidate,
    setOutput,
    setModeOfData,
    setDataLoader,
    setDisplayBullhorn,
    setThisNewData,
    clearOutput,
    setResume,
    mode,
  } = useCandidate();

  const handleClick = async () => {
    setDataLoader(true);

    try {
      // Send a POST request to the Flask backend
      const response = await axios.post("/api/get_candidate", {
        candidateId: id,
      });
      setCandidate(id);
      const defaultMode = mode || "bullhorn"
      setModeOfData(defaultMode);
      console.log(mode)
      clearOutput();
      setOutput(response.data);
      setDisplayBullhorn(response.data);
      setThisNewData(true);

      const responsePDF = await axios.post("/api/get_pdf", {
        candidateId: id || null,
        mode: mode,
      });
      setResume(responsePDF.data.files);
      setDataLoader(false);
      console.log(responsePDF.data.files);
    } catch (error) {
      console.error(error);
      setDataLoader(false);
      toast.warn("Error: Data unavailable, please try again.");
    }
  };

  return (
    <div className="p-3 flex justify-center items-center w-[100%] gap-8 p=4 hover:bg-[#CECECE] mx-[.5rem]">
      <div className="rounded-full bg-[#D3D3D3] w-[10%] flex justify-center items-start p-2">
        <img
          src={require("../../assets/pdf_icon.png")}
          alt="pdf-icon"
          className="w-[70%]"
        />
      </div>

      <div className="w-[70%] flex flex-col gap-2 justify-items-start  ">
        <h3 className="font-bold">
          {first_name && last_name ? `${first_name} ${last_name}` : "N/A"}
        </h3>
        <p className="text-[#919191]">{status}</p>
        <button
          className="font-bold underline hover:cursor-pointer text-left"
          onClick={handleClick}
        >
          {active ? "View" : "Run"}
        </button>
      </div>
    </div>
  );
};

export default PDFInfo;
