import React from 'react'

const QueueInference = () => {
  return (
    <div className=' bg-[#F5F5F5] max-w-[100%] pt-4'>
    <div className='flex gap-6'>
    <button className='hover:underline'> In Progress</button>
      <button  className='hover:underline'> Completed </button>

    </div>

      <div className='pt-4'>
      <p className="w-1/3 inline-block mb-[.30rem]">Candidate's Name:</p>
      <span className="text-[#919191] w-2/3 inline-block"> Brian </span>
      <p className="w-1/3 inline-block mb-[.30rem]">Candidate ID:</p>
      <span className="text-[#919191] w-2/3 inline-block"> 32323</span>
      <p className="w-1/3 inline-block mb-[.30rem]">Inference Status:</p>
      <span className="text-[#919191] w-2/3 inline-block">Scalabrine</span>

      </div>
    </div>
  )
}

export default QueueInference
