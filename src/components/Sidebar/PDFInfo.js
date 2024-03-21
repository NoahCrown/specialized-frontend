import React from "react";
import { toast } from "react-toastify";
import { useCandidate } from "../../store/Context";
import { fetchCandidateInfo } from '../../services/apiServices'; // Make sure this is imported correctly

const PDFInfo = ({
  id,
  first_name,
  last_name,
  status,
  active,
  Age,
  ageConfidence,
  bulk,
  languageSkills,
  Location,
  locationConfidence,
  result
}) => {
  const {
    setCandidate,
    setOutput,
    setModeOfData,
    setDataLoader,
    setDisplayBullhorn,
    setThisNewData,
    clearOutput,
    mode,
    setLoaderDetails,
  } = useCandidate();
  console.log(Age, ageConfidence, bulk, languageSkills, result);


  const handleClick = async () => {
    setDataLoader(true);
    toast.success('Running candidate ' + id)

    try {
      // Send a POST request to the Flask backend
      const response = await fetchCandidateInfo(id);
      console.log(response)

      await setModeOfData("bullhorn");
      setCandidate(id);
      console.log(mode);
      clearOutput();
      setLoaderDetails("Parsing");
      setDisplayBullhorn(response);
      setThisNewData(true);
      setDataLoader(false);
      if (bulk) {
        let newData = { ...response };
      
        if (result.Age) {
          newData.inferredAge = { Age: result.Age, ageConfidence: result.confidence };
        } else if (Age && ageConfidence) {
          newData.inferredAge = { Age, ageConfidence };
        }

        if (result.languageSkills) {
          newData.languageSkills = result;
        } else if (languageSkills) {
          newData.languageSkills = languageSkills;        }
      
          if (result.Location) {
            newData.inferredLocation = { Location: result.Location, locationConfidence: result.confidence };
          } else if (Age && ageConfidence) {
            newData.inferredLocation = { Location, locationConfidence };
          }
      
        setOutput(newData);
      } else {
        setOutput(response);
      }
      
    } catch (error) {
      setDataLoader(false);

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
          {first_name && last_name ? `${first_name} ${last_name}` : first_name}
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
