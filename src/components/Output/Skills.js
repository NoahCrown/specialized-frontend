import React from "react";
import { useCandidate } from "../../store/Context";

const Skills = () => {
  const { promptResult } = useCandidate();
  return (
    <div>
      <div className="text-black border-solid border-b-2 border-[#E7E7E7] w-full py-2">
        <p className=" font-semibold py-2 ">Skills/Qualification</p>
        {/* Primary Skills  */}
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Primary Skills:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(
                  promptResult[0].properties.primarySkills[0].data
                ) &&
                promptResult[0].properties.primarySkills[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].primarySkills?.[0]?.data) &&
                promptResult[0].primarySkills?.[0]?.data?.length > 0 ? (
                promptResult[0].primarySkills?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0].primarySkills?.data) &&
                promptResult[0].primarySkills?.data?.length > 0 ? (
                promptResult[0].primarySkills?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.primarySkills) &&
                promptResult[0]?.primarySkills.length > 0 ? (
                promptResult[0]?.primarySkills.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        {/* Secondary Skills  */}
        <div className="flex flex-wrap ">
          <p className="w-1/4 inline-block align-top">Secondary Skills:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(
                  promptResult[0].properties.secondarySkills[0].data
                ) &&
                promptResult[0].properties.secondarySkills[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].secondarySkills?.[0]?.data) &&
                promptResult[0].secondarySkills?.[0]?.data.length > 0 ? (
                promptResult[0].secondarySkills?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.secondarySkills?.data) &&
                promptResult[0]?.secondarySkills?.data?.length > 0 ? (
                promptResult[0]?.secondarySkills?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.secondarySkills) &&
                promptResult[0]?.secondarySkills.length > 0 ? (
                promptResult[0]?.secondarySkills.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        {/* Skill Set  */}
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Skill Set:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(promptResult[0].properties.skillSet[0].data) &&
                promptResult[0].properties.skillSet[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].skillSet?.[0]?.data) &&
                promptResult[0].skillSet?.[0]?.data?.length > 0 ? (
                promptResult[0].skillSet?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0].skillSet?.data) &&
                promptResult[0].skillSet?.data.length > 0 ? (
                promptResult[0].skillSet?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.skillSet) &&
                promptResult[0]?.skillSet.length > 0 ? (
                promptResult[0]?.skillSet.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
        </div>
        {/* Certification  */}
        <div className="flex flex-wrap	">
          <p className="w-1/4 inline-block align-top ">Certifications:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            {promptResult[0]?.properties?.certifications
              ? promptResult[0].properties.certifications.map((val, i) => (
                  <ul key={i}>
                    <li className="list-disc">{val}</li>
                  </ul>
                ))
              : promptResult[0]?.certifications
              ? promptResult[0].certifications.map((val, i) => (
                  <ul key={i}>
                    <li className="list-disc">{val}</li>
                  </ul>
                ))
              : "N/A"}
          </span>
        </div>
        {/* Specialties  */}
        <div className="flex flex-wrap">
          <p className="w-1/4 inline-block align-top">Specialties:</p>
          <span className="text-[#919191] w-3/4 inline-block">
            <ul className="flex gap-x-8 flex-wrap">
              {promptResult[0].properties ? (
                Array.isArray(
                  promptResult[0].properties.specialties?.[0].data
                ) &&
                promptResult[0].properties.specialties?.[0].data.map(
                  (val, index) => (
                    <li className="list-disc" key={index}>
                      {val.name || val}
                    </li>
                  )
                )
              ) : Array.isArray(promptResult[0].specialties?.[0]?.data) &&
                promptResult[0].specialties?.[0]?.data.length > 0 ? (
                promptResult[0].specialties?.[0]?.data.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name || val}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.specialties?.data) &&
                promptResult[0]?.specialties?.data?.length > 0 ? (
                promptResult[0]?.specialties?.data?.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val.name}
                  </li>
                ))
              ) : Array.isArray(promptResult[0]?.specialties) &&
                promptResult[0]?.specialties.length > 0 ? (
                promptResult[0]?.specialties.map((val, index) => (
                  <li className="list-disc" key={index}>
                    {val}
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>
          </span>
          {/* Comments  */}
          <div className="flex flex-wrap">
            <p className="w-1/4 inline-block align-top">Comments:</p>
            <span className="text-[#919191] w-3/4 inline-block">
              {promptResult[0]?.properties?.comments
                ? promptResult[0].properties?.comments
                : promptResult[0]?.comments || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
