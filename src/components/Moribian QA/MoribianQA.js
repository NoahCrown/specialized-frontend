import axios from "axios";
import { useState } from "react";
import logo from '../../assets/specialized_icon.png';
import { useCandidate } from "../../store/Context";


function MoribianQA() {
  const PLACEHOLDER = "**Job Title:** Senior Software Engineer \n\n**Industry:** Technology\n\n**Job Description:**\n\nWe are representing a leading tech company in their search for a talented Senior Software Engineer. This role offers an exceptional opportunity for a seasoned professional to work with cutting-edge technology and contribute to the development of innovative software solutions. The company provides a competitive salary, flexible working hours, and health benefits.\n\n**Responsibilities:**\n\n- Design, code, and debug complex software applications.\n- Integrate software with existing systems.\n- Evaluate and identify new technologies for implementation.\n- Work with cloud platforms like AWS or Azure.\n- Collaborate with cross-functional teams to define, design, and ship new features.\n- Work on bug fixing and improving application performance.\n\n**Qualifications:**\n\n- Minimum 7 years of experience in Software Development.\n- Proficient in cloud platforms like AWS or Azure.\n- Excellent problem-solving skills.\n- Strong knowledge of software implementation best practices.\n- Highly proficient in software engineering languages and tools; ability to quickly learn new technologies.\n\nTurn your passion for technology into a successful career. Apply today!";
  const {
    openMoribianQA
  } = useCandidate();
  const [responseData, setResponseData] = useState(null);
  const [toImproveJobSpec, setToImproveJobSpec] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://specialized-backend-ubuq.onrender.com/api/qa', { data: toImproveJobSpec });
      setResponseData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    setToImproveJobSpec(event.target.value);
    console.log(toImproveJobSpec);
  };

  return (
    <div className="App box-border absolute w-full h-[100vh]">
      <div className="w-full flex justify-center items-center flex-col fixed inset-0 bg-black bg-opacity-50 h-[100vh] ">
        <div className="flex justify-center flex-col w-3/4 bg-[#FFFFFF] h-[80%] gap-2 rounded-md p-4 drop-shadow-md">
        <div className="flex justify-between items-center gap-2">
        <img src={logo} alt="Example SVG" className="w-[20%]" />
        <button onClick={openMoribianQA} className="bg-black rounded-full w-[1.5%] px-1 text-white  text-center"> X </button>
        </div>
          

          <div className="w-full h-full flex justify-center gap-2 overflow-hidden">
            <div className="w-1/2 h-[90%]">
              <textarea
                className="w-full h-full bg-[#FFFFFF] p-4 resize-none border-2"
                placeholder={PLACEHOLDER}
                value={toImproveJobSpec}
                onChange={handleChange}
              />
              <button
                className="bg-black text-white p-2 rounded-md font-bold transition-transform transform hover:scale-105 hover:text-black hover:bg-[#FCBB4A] m-2"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Improve Job Spec'}
              </button>
            </div>
            <div className="w-1/2 h-[90%] flex flex-col gap-2">
              <div className="w-full h-1/4 border-2 p-2">
                <p className="font-bold">Changes: </p>
                <textarea
                  className="w-full h-[80%] bg-[#FFFFFF] p-2 resize-none outline-none"
                  readOnly
                  value={responseData ? responseData.Changes : ''}
                />
              </div>

              <div className="w-full h-3/4 border-2 p-2">
                <p className="font-bold">Improved Version: </p>
                <textarea
                  className="w-full h-[80%] bg-[#FFFFFF] p-2 resize-none outline-none"
                  readOnly
                  value={responseData ? responseData.JobDescription : ''}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
        </div>
      )}
    </div>
  );
}

export default MoribianQA;
