import React, { useState } from "react";
import axios from "axios";
import { useCandidate } from "../../store/Context";
import logo from '../../assets/specialized_icon.png';

const PLACEHOLDER = `**Job Title:** Senior Software Engineer 

**Industry:** Technology

**Job Description:**

We are representing a leading tech company in their search for a talented Senior Software Engineer. This role offers an exceptional opportunity for a seasoned professional to work with cutting-edge technology and contribute to the development of innovative software solutions. The company provides a competitive salary, flexible working hours, and health benefits.

**Responsibilities:**

- Design, code, and debug complex software applications.
- Integrate software with existing systems.
- Evaluate and identify new technologies for implementation.
- Work with cloud platforms like AWS or Azure.
- Collaborate with cross-functional teams to define, design, and ship new features.
- Work on bug fixing and improving application performance.

**Qualifications:**

- Minimum 7 years of experience in Software Development.
- Proficient in cloud platforms like AWS or Azure.
- Excellent problem-solving skills.
- Strong knowledge of software implementation best practices.
- Highly proficient in software engineering languages and tools; ability to quickly learn new technologies.

Turn your passion for technology into a successful career. Apply today!`;

function MoribianQA() {
  const { openMoribianQA } = useCandidate();
  const [responseData, setResponseData] = useState(null);
  const [toImproveJobSpec, setToImproveJobSpec] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:10000/api/qa', { data: toImproveJobSpec });
      setResponseData(response.data);
    } catch (error) {
      console.error("Error improving job spec:", error);
      // TODO: Add error handling UI
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    console.log("Saving data to vector store:", responseData);
    // TODO: Implement save logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 flex flex-col p-6">
        <Header logo={logo} onClose={openMoribianQA} />
        <div className="flex flex-1 gap-6 overflow-hidden">
          <InputSection
            value={toImproveJobSpec}
            onChange={(e) => setToImproveJobSpec(e.target.value)}
            onImprove={handleImprove}
            onSave={handleSave}
            loading={loading}
            canSave={!!responseData}
          />
          <ResultsSection responseData={responseData} />
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
}

function Header({ logo, onClose }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <img src={logo} alt="Specialized Icon" className="w-40" />
      <button onClick={onClose} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function InputSection({ value, onChange, onImprove, onSave, loading, canSave }) {
  return (
    <div className="w-1/2 flex flex-col">
      <textarea
        className="flex-1 p-4 border rounded-md resize-none mb-4"
        placeholder={PLACEHOLDER}
        value={value}
        onChange={onChange}
      />
      <div className="flex gap-3">
        <Button
          onClick={onImprove}
          disabled={loading || !value.trim()}
          className="bg-black text-white hover:bg-gray-800 flex-grow"
        >
          {loading ? 'Improving...' : 'Improve Job Spec'}
        </Button>
        <Button
          onClick={onSave}
          disabled={!canSave}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Save Result
        </Button>
      </div>
    </div>
  );
}

function ResultsSection({ responseData }) {
  return (
    <div className="w-1/2 flex flex-col gap-4 overflow-y-auto">
      <ResultSection title="Changes" content={responseData?.Changes} />
      <ResultSection title="Improved Version" content={responseData?.JobDescription} />
      <ResultSection title="Analysis" content={responseData?.Analysis} />
    </div>
  );
}

function ResultSection({ title, content }) {
  return (
    <div className="border rounded-md p-4 flex-1">
      <h2 className="font-bold mb-2">{title}:</h2>
      <div className="h-full overflow-y-auto">
        <p className="whitespace-pre-wrap">{content || 'No data available'}</p>
      </div>
    </div>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`p-2 rounded-md font-bold transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div role="status">
        <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default MoribianQA;