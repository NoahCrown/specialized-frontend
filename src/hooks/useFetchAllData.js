// hooks/useFetchAllData.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCandidate } from '../store/Context';


const useFetchAllData = (apiUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {
    isLoading
  } = useCandidate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/process_data`);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error:', error);
      } finally {
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, error, isLoading };
};

export default useFetchAllData;
