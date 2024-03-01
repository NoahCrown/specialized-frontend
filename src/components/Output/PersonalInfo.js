import React from 'react'
import { useCandidate } from "../../store/Context";


const PersonalInfo = () => {
    const {
        promptResult,
      } = useCandidate();
      console.log(promptResult[0])
  return (
    <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
        <p className="text-black py-2 font-semibold">Personal Information</p>
        <p className="w-1/4 inline-block">First Name:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.firstName
            ? promptResult[0]?.properties?.firstName
            : promptResult[0]?.firstName || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Last Name:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.lastName
            ? promptResult[0]?.properties?.lastName
            : promptResult[0]?.lastName || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Phone:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.phone
            ? promptResult[0]?.properties?.phone
            : promptResult[0]?.phone || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Ethnicity:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.ethnicity
            ? promptResult[0]?.properties?.ethnicity
            : promptResult[0]?.ethnicity || "N/A"}
        </span>

        <p className="w-1/4 inline-block">Address:</p>
        <span className="text-[#919191] w-3/4 inline-block">
  {promptResult[0]?.properties?.address ? (
    <>
      {promptResult[0]?.properties?.address?.address1 && promptResult[0]?.properties?.address?.address1 + ' '}
      {promptResult[0]?.properties?.address?.address2 && promptResult[0]?.properties?.address?.address2 + ' '}
      {promptResult[0]?.properties?.address?.city && promptResult[0]?.properties?.address?.city + ' '}
      {promptResult[0]?.properties?.address?.countryID && promptResult[0]?.properties?.address?.countryID + ' '}
    </>
  ) : (
    <>
      {promptResult[0]?.address?.address1 && promptResult[0]?.address?.address1 + ' '}
      {promptResult[0]?.address?.address2 && promptResult[0]?.address?.address2 + ' '}
      {promptResult[0]?.address?.city && promptResult[0]?.address?.city + ' '}
      {promptResult[0]?.address?.countryID && promptResult[0]?.address?.countryID + ' '}
    </>
  )}
  {!promptResult[0]?.properties?.address && 
   !promptResult[0]?.address?.address1 &&
   !promptResult[0]?.address?.address2 &&
   !promptResult[0]?.address?.city &&
   !promptResult[0]?.address?.countryID &&
   'N/A'}
</span>


<p className="w-1/4 inline-block">Date of Birth:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.dateOfBirth
            ? promptResult[0]?.properties?.dateOfBirth
            : promptResult[0]?.dateOfBirth || "N/A"}
        </span>
        
        <p className="w-1/4 inline-block">Email:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.email
            ? promptResult[0]?.properties?.email
            : promptResult[0]?.email || "N/A"}
        </span>
        <p className="w-1/4 inline-block">Ed. Degree:</p>
        <span className="text-[#919191] w-3/4 inline-block">
          {promptResult[0]?.properties?.educationDegree
            ? promptResult[0]?.properties?.educationDegree
            : promptResult[0]?.educationDegree || "N/A"}
        </span>
      </div>

  )
}

export default PersonalInfo
