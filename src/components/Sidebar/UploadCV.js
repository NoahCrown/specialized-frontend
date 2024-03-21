import React, { useRef } from "react";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import { uploadFile } from '../../services/apiServices'; // Make sure to import correctly

const UploadCV = () => {
  const fileInputRef = useRef(null);
  const {
    setOutput,
    setModeOfData,
    selectedFile,
    setUploadFile,
    setDataLoader,
    setLoaderDetails,
    setCandidate,
    clearOutput
  } = useCandidate();

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadFile(file);
      toast.success("File added successfully");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("No file selected");
      return;
    }
    setDataLoader(true);
    clearOutput();
    setLoaderDetails("Parsing");

    try {
      const data = await uploadFile(selectedFile);
      setOutput(data);
      setCandidate(null);
      setModeOfData("CV");
    } catch (error) {
      // Error handling is done in uploadFile
    } finally {
      setDataLoader(false);
    }
  };

  const handleFileRemove = () => {
    setUploadFile(null);
    toast.success("File removed successfully");
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadFile(file);
      toast.success("File added successfully");
    }
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
