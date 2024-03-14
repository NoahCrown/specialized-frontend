import React, { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';


const Context = createContext();

export const CandidateProvider = ({ children }) => {
  // Data Context
  const [data, setData] = useState([]);

  const setAllData = (data) => {
    setData(data);
  };

  // File Upload Context
  const [selectedFile, setSelectedFile] = useState(null);

  const setUploadFile = (file) => {
    setSelectedFile(file);
  };

  // Candidate ID Context
  const [candidateId, setCandidateId] = useState(null);

  const setCandidate = (id) => {
    setCandidateId(id);
  };

  // Output Display Context
  const [promptResult, setPromptResult] = useState(null);

  const setOutput = (data) => {
    setPromptResult(data);
  };

  // Output Parsed Data Context
  const [parsedData, setParsedData] = useState(null);

  const setBHParsedData = (data) => {
    setPromptResult(data);
  };

  // Ouput Default Bullhorn Data Context
  const [defaultBullhornData, setDefaultBullhornData] = useState(null);

  const setDisplayBullhorn = (data) => {
    setDefaultBullhornData(data);
  };

  // Select Data To Infer Context
  const [dataToInfer, setDataToInfer] = useState("");

  const setDataInfer = (data) => {
    setDataToInfer(data);
  };

  // Infered Age Data Context


  // Infered Language Proficiency Context


  // Infered Location Data Context


  // Infered in Offshorly parser
  // Infered Age Data Context


  // Infered Language Proficiency Context
 
  // Infered Location Data Context



  // Mode of Data Context
  const [mode, setMode] = useState(null);
  const setModeOfData = (data) => {
    setMode(data);
  };

  // Search Result Context
  const [searchResults, setSearchResults] = useState([]);
  const setSearchData = (data) => {
    setSearchResults(data);
  };

  // Missing Data Search Result
  const [missingDataToSearch, setMissingDataToSearch] = useState(null);
  const setSearchMissingData = (data) => {
    setMissingDataToSearch(data);
  };

  // Data loading Loader Context
  const [isLoading, setIsLoading] = useState(false);

  const setDataLoader = (bool) => {
    setIsLoading(bool);
  };

  // Pushing to bullhorn Modal
  const [isPushingToBullhorn, setIsPushingToBullhorn] = useState(false)
  const showPushingModal = () => {
    setIsPushingToBullhorn(!isPushingToBullhorn)
  }

  // Run in bulk modal
  const [isRunningInBulk, setIsRunningInBulk] = useState(false)
  const showRunInBulk = () => {
    setIsRunningInBulk(!isRunningInBulk)
  }

  // Opening PDF Logic Context
  const handleOpenPdfInNewTab = (base64Pdf) => {
    try {
      var pdfData = `data:application/pdf;base64,${base64Pdf}`;

      var w = window.open("");

      if (w) {
        w.document.write(
          `<embed width="100%" height="100%" src="${pdfData}" type="application/pdf" />`
        );
      } else {
        throw new Error("Failed to open a new tab.");
      }
    } catch (error) {
      console.error("Error opening PDF in new tab:", error);

    }
  };

  // Search Result data

  // Epoch To Date
  function epochToDateString(epochTime) {
    // Check if epochTime is a valid number
    if (isNaN(epochTime) || epochTime < 0) {
      return null;
    }

    if (epochTime === null){
      return null
    }
  
  
    const date = new Date(epochTime);
    // Check if the resulting date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;
  
    return dateString;
  }

  // Prompts Context
  const [agePrompts, setAgePrompts] = useState([]);
  const setAgePromptInputs = (data) => {
    setAgePrompts(data);
  };

  const [languagePrompts, setLanguagePrompts] = useState([]); // State for language prompts
  const setLanguagePromptInputs = (data) => {
    setLanguagePrompts(data);
  };

  const [locationPrompts, setLocationPrompts] = useState([]); // State for location prompts
  const setLocationPromptInputs = (data) => {
    setLocationPrompts(data);
  };

  // Saved Prompts Context
  const [savedPrompts, setSavedPrompts] = useState({
    age: 0,
    languageSkills: 0,
    location: 0,
  });

  const setSavedPromptsData = (data) => {
    setSavedPrompts(data);
  };

  // Loader Info Context
  const [loaderContext, setLoaderContext] = useState("Parsing");
  const setLoaderDetails = (data) => {
    setLoaderContext(data);
  };

  const [isNewData, setIsNewData] = useState(false);
  const setThisNewData = (data) => {
    setIsNewData(data);
  };

  // Resume Files Context
  const [resumeFiles, setResumeFiles] = useState(null);
  const setResume = (data) => {
    setResumeFiles(data);
  };

  // Clear the output field
  const clearOutput = () => {
    setResume(null);
  };

  // Simple Auth
  const [username, setUsername] = useState('');
  const setAppUsername = (data) => {
    setUsername(data)
  }
  const [password, setPassword] = useState('');
  const setAppPassword = (data) => {
    setPassword(data)

  }

  const [isAuthorized, setIsAuthorized] = useState(false)
  const login = () =>{
    if (username === process.env.REACT_APP_AUTH_USER && password === process.env.REACT_APP_AUTH_PASSWORD) {
      setIsAuthorized(true)
      toast.success('Successfully logged in')
    }else {
      toast.warn('Incorrect credentials')
    }

  }

  const [bulkInference, setBulkInference] = useState(null)
  const setBulkInferenceData = (data) => {
    setBulkInference(data)
  }

  const [isBulkInferenceShowing, SetIsBulkInferenceShowing] = useState(false)
  const showBulkInferenceData = () => {
    SetIsBulkInferenceShowing(!isBulkInferenceShowing)
  }



  return (
    <Context.Provider
      value={{
        candidateId,
        setCandidate,
        promptResult,
        setPromptResult,
        setOutput,
        searchResults,
        dataToInfer,
        mode,
        setModeOfData,
        data,
        setAllData,
        selectedFile,
        setUploadFile,
        isLoading,
        setDataLoader,
        handleOpenPdfInNewTab,
        epochToDateString,
        setDataInfer,
        agePrompts,
        languagePrompts,
        locationPrompts,
        setAgePromptInputs,
        setLanguagePromptInputs,
        setLocationPromptInputs,
        savedPrompts,
        setSavedPromptsData,
        parsedData,
        setBHParsedData,
        defaultBullhornData,
        setDisplayBullhorn,
        loaderContext,
        setLoaderDetails,
        isNewData,
        setThisNewData,
        resumeFiles,
        setResume,
        clearOutput,
        setSearchData,
        missingDataToSearch,
        setSearchMissingData,
        isPushingToBullhorn,
        showPushingModal,
        username,
        setAppUsername,
        password,
        setAppPassword,
        isAuthorized,
        login,
        isRunningInBulk,
        showRunInBulk,
        bulkInference,
        setBulkInferenceData,
        isBulkInferenceShowing,
        showBulkInferenceData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCandidate = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
};
