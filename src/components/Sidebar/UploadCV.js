import React, { useRef } from "react";
import { useCandidate } from "../../store/Context";
import { toast } from "react-toastify";
import { uploadFile } from "../../services/apiServices"; // Make sure to import correctly

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
    clearOutput,
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

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  return (
    <div className="flex justify-center items-center flex-col p-3 w-[100%] px-4 border-solid border-b-2 border-[#E7E7E7]">
      <div className="w-[100%] flex flex-col">
        <div className="rounded-sm border-dashed border-2 border-[#E7E7E7] w-[100%] h-[5vh] flex justify-start items-center py-8 px-4 gap-2">
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleDivClick}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <>
                <div className="flex flex-row justify-center items-center w-full gap-5 ">
                    <img
                      src={require("../../assets/pdf.png")}
                      alt="pdf-icon"
                      className="max-w-[80%]"
                    />
                  <p className="text-[.75rem]  break-words">
                  {truncateText(selectedFile.name, 15)}
                  </p>

                  <i
                    onClick={handleFileRemove}
                    class="hover:cursor-pointer fa-regular fa-circle-xmark"
                  ></i>
                </div>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  name="pdfFile"
                  className="upload-button hidden w-full"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />

                <p className="text-[#7E7E7E]">
                  <span className="bg-black text-white px-5 py-3 rounded-md hover:cursor-pointer mr-2">
                    Browse
                  </span>{" "}
                     or drop files here
                </p>
              </>
            )}
          </div>

          {selectedFile && (
            <button
              className="rounded-md bg-black text-white px-8 font-bold py-3 text-[.75rem]"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div>
      <p className="text-[#7E7E7E] text-[.9rem] mt-4">Accepted Files: PDF, DOCX. Max file size: 10MB</p>
    </div>
  );
};

export default UploadCV;
