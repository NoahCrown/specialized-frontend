// App.js
import React, {useEffect} from 'react';
import Sidebar from "./components/Sidebar";
import Output from './components/Output';
import Prompt from "./components/Prompt";
import { useCandidate } from './store/Context';
import { ToastContainer } from 'react-toastify';
import ModalLoader from "./components/ModalLoader";
import PushToBullorn from "./components/Output/PushToBullorn";
import SimpleAuth from "./components/Auth/SimpleAuth";
import useFetchAllData from './hooks/useFetchAllData'; 
function App() {
  const { setAllData, isPushingToBullhorn, isAuthorized, isLoading } = useCandidate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  
  // Use the custom hook to fetch data
  const { data, error } = useFetchAllData(REACT_APP_API_URL);

  // Use effect to set data from the hook to context
  useEffect(() => {
    if (data) {
      setAllData(data);
    }
    if (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [data, error, setAllData]);

  return (
    <div className="App flex bg-white items-center flex-row box-border">
      {isLoading && <ModalLoader/>}
      {isPushingToBullhorn && <PushToBullorn/>}
      {isAuthorized ? (
        <>
          <Sidebar/>
          <Output/>
          <Prompt/>
        </>
      ) : <SimpleAuth/>}
      <ToastContainer/> 
    </div>
  );
}

export default App;
