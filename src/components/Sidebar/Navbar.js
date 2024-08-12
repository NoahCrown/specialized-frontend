import React from 'react'
import { useCandidate } from "../../store/Context";

const Navbar = () => {
  const {
    openMoribianQA
  } = useCandidate();
  return (
    <div className=" flex justify-between items-center border-solid border-b-2 border-[#E7E7E7] w-full px-2 py-2">
    <img
      src={require("../../assets/specialized_icon.png")}
      alt="specialized-icon"
      className="w-1/2"
    />
    <button onClick={openMoribianQA} className='rounded-md bg-black text-white px-8 font-bold py-3 text-[.75rem]'> Moribian QA</button>
  </div>
  )
}

export default Navbar