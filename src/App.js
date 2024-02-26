// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect } from "react";
import axios from 'axios'
import { useCandidate } from './store/Context';
import { ToastContainer } from 'react-toastify';
import ModalLoader from "./components/ModalLoader";
import { API_URL } from "./config";
import PushToBullorn from "./components/Output/PushToBullorn";




function App() {
  const { setAllData, isLoading, isPushingToBullhorn } = useCandidate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/process_data`);
        setAllData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="App flex bg-white items-center flex-row box-border">
    {isLoading && 
        <ModalLoader/> }
    {
      isPushingToBullhorn && <PushToBullorn/>
    }
      


      <Sidebar/>
      <Output/>
      <Prompt/>
      <ToastContainer/>

  

    </div>
  );
}

export default App;
