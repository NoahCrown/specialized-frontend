// services/apiServices.js
import axios from 'axios';
import { toast } from 'react-toastify';



const API_BASE_URL = process.env.REACT_APP_API_URL;

// Function to enqueue data

export const enqueueData = async (data) => {
    
  try {
    const response = await axios.post(`${API_BASE_URL}/api/enqueue`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Added inference to the queue.");
    return response.data;
  } catch (error) {
    console.error("Error enqueuing data:", error);
    toast.warn("Queue inference failed");
    throw error;
  }
};

// Function to submit prompt
export const submitPrompt = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/prompt_input`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(`Inferring ${data.dataToInfer}, please wait.`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Failed to infer data, please try again later.");
    throw error;
  }
};

// Function to save prompt
export const savePrompt = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/save_prompt`, data);
      toast.success("Prompt successfully saved.");
      return response.data; // In case you need the response
    } catch (error) {
      console.error("Error saving prompt:", error.response ? error.response.data : "Unknown error");
      toast.warn("Failed to save prompt");
      throw error;
    }
  };

// Function to delete prompt
export const deletePrompt = async (id, dataToInfer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/delete_prompt/${id}`, { dataToInfer });
      toast.success("Prompt successfully deleted.");
      return response.data; // In case you need the response
    } catch (error) {
      console.error("Error deleting prompt:", error.response ? error.response.data : "Unknown error");
      toast.error("Failed to delete prompt.");
      throw error;
    }
  };

  export const runBulkInference = async (prompt, dataToInfer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bulk_prompt_input`, {
        response: prompt,
        dataToInfer: dataToInfer,
      });
      toast.success("Bulk inference success!");
      return response.data;
    } catch (error) {
      console.error("Error in bulk inference:", error);
      toast.warn("Something went wrong, please try again");
      throw error; // Re-throw to handle it in the component if needed
    }
  };

  export const fetchCandidateInfo = async (candidateId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/get_candidate`, {
        candidateId: candidateId,
      });
      return response.data; // Assuming this returns the candidate data directly
    } catch (error) {
      console.error("Error fetching candidate info:", error);
      toast.warn("Error: Data unavailable, please try again.");
      throw error; // Re-throw to handle it in the component if needed
    }
  };

  export const searchByName = async (name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/search_name`, { name: name });
      return response.data; // Assuming this returns the search results directly
    } catch (error) {
      console.error("Error searching by name:", error);
      toast.error("Failed to complete search");
      throw error; // Re-throw to handle it in the component if needed
    }
  };

  export const filterDataByMissingFields = async (missingFields) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/filter_data`, { missingFields });
      return response.data; // Assuming this returns the search results directly
    } catch (error) {
      console.error("Error filtering data by missing fields:", error);
      toast.error("Failed to complete search");
      throw error; // Re-throw to handle it in the component if needed
    }
  };

  export const uploadFile = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);
  
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("File uploaded successfully");
      return response.data; // Assuming this is the data you want to set in setOutput
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
      throw error; // Re-throw to handle it in the component if needed
    }
  };

  export const fetchPDFs = async (candidateId, mode) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/get_pdf`, { candidateId, mode });
      return response.data.files; // Assuming the response contains a files array
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      toast.warn("Error: Data unavailable, please try again.");
      throw error;
    }
  };

  export const parseBullhornData = async (candidateId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/extract_bullhorn`, {
        candidateId: candidateId,
      });
      toast.success("Successfully parsed Bullhorn data.");
      return response.data;
    } catch (error) {
      console.error("Error parsing Bullhorn data:", error);
      toast.error(`Error parsing data: ${error.response?.data?.message || "Resume format is not supported"}`);
      throw error; // Re-throw to allow for custom handling in the component
    }
  };

  export const fetchSavedPrompts = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/load_prompt`, { dataToInfer: null });
      return response.data;
    } catch (error) {
      console.error("Error fetching saved prompts:", error);
      toast.error("Failed to load saved prompts.");
      throw error;
    }
  };
  
  // Fetch individual prompt details
  export const fetchPromptDetails = async (dataToInfer, id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/get_prompt/${id}`, { dataToInfer });
      return response.data.prompt;
    } catch (error) {
      console.error(`Error fetching prompt details for ${dataToInfer}:`, error);
      throw error; // Allows for custom error handling in the component
    }
  };
