// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect } from "react";
import axios from 'axios'
import { useCandidate } from './store/Context';
import { ToastContainer } from 'react-toastify';
import ModalLoader from "./components/ModalLoader";
import PushToBullorn from "./components/Output/PushToBullorn";
import SimpleAuth from "./components/Auth/SimpleAuth";
import RunInBulk from "./components/Prompt/RunInBulk";

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL
// axios.defaults.baseURL = process.env.REACT_APP_API_URL

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL



function App() {
  const { setAllData, isLoading, isPushingToBullhorn, isAuthorized, isRunningInBulk } = useCandidate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/process_data`);
        setAllData(response.data);
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




      

    {isAuthorized ? <>
      <Sidebar/>
      <Output/>
      <Prompt/>
    </>:
    <SimpleAuth/>}

    <ToastContainer/> 

      
  

    </div>
  );
}

export default App;
