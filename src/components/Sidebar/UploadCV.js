import React, { useRef } from "react";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import axios from "axios";

const UploadCV = () => {
  const fileInputRef = useRef(null);

  const {
    setOutput,
    setModeOfData,
    selectedFile,
    setUploadFile,
    setDataLoader,
    setLoaderDetails,
    mode,
    setCandidate,
    clearOutput
  } = useCandidate();
  const handleDivClick = () => {
    // Trigger the hidden file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
    toast.success("Filed Added Successfully");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    toast.success("Uploading file, please wait.");
    clearOutput()
    setLoaderDetails("Parsing");
    setDataLoader(true);

    const pdfData = new FormData();
    pdfData.append("pdfFile", selectedFile); 

    await axios
      .post("/api/upload", pdfData)

      .then((response) => {
        // Handle the response from the server
        setOutput(response.data);
        toast.success("File uploaded successfully");
        setCandidate(null)
        setDataLoader(false);
        setModeOfData("CV");

        
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error uploading file:", error);
      });
  };

  const handleFileRemove = () => {
    setUploadFile(null); 
    toast.success("File Removed Successfully");
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setUploadFile(event.dataTransfer.files[0]);
    toast.success("Filed Added Successfully");
  };

  return (
    <div className="flex justify-center items-center flex-col p-3 w-[80%] px-4 border-solid border-b-2 border-[#E7E7E7]">
      <div className="w-[100%] flex flex-col">
        <div className="rounded-sm border-dashed border-2 border-[#E7E7E7] w-[100%] h-[20vh] flex flex-col justify-center items-center p-10 gap-2">
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleDivClick}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <>
                <div className="flex flex-row justify-center items-center gap-5 w-full ">
                  <div className="rounded-full bg-[#D3D3D3] min-w-[20%] max-w-[20%] flex justify-center items-center p-2">
                    <img
                      src={require("../../assets/pdf_icon.png")}
                      alt="pdf-icon"
                      className="w-[80%]"
                    />
                  </div>
                  <p className="text-[.75rem] min-w-[60%] max-w-[60%] break-words">
                    {selectedFile.name}
                  </p>

                  <i
                    onClick={handleFileRemove}
                    class="hover:cursor-pointer fa-regular fa-circle-xmark"
                  ></i>
                </div>
              </>
            ) : (
              <>
                <img src={require("../../assets/upload.jpg")} alt="upload"></img>
                <input
                  type="file"
                  accept="application/pdf"
                  name="pdfFile"
                  className="upload-button hidden w-full"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                
                <label id="upload-text" className="text-center">
                  <span class="text-[.75rem] text-[#919191] block " id="upload-click">
                    Upload a CV from your computer
                  </span>
                  <span class="text-[.75rem] text-[#919191] text-center" id="upload-click">
                    Click on me to upload

                  </span>
                </label>
              </>
            )}
          </div>

          {
  selectedFile && 
  <button
            className="rounded-md bg-black text-white px-8 font-bold py-3 text-[.75rem]"
            onClick={handleUpload}
          >

          Upload</button>
       
          
}

        </div>
      </div>
    </div>
  );
};

export default UploadCV;
