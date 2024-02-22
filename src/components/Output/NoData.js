import React from 'react'

const NoData = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col min-h-[80vh]">
            <img
              src={require("../../assets/no-data.png")}
              alt="svg-no-data"
              className="w-1/3"
            />
            <p className="text-[#919191]">No data to show.</p>
            <p className="text-[#919191]">Upload or run CVs to load data.</p>
          </div>
  )
}

export default NoData