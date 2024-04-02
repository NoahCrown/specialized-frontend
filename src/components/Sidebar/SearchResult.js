import React from "react";
import Slider from "react-slick";
import PDFInfo from "../Sidebar/PDFInfo";
import { useCandidate } from "../../store/Context";

const SearchResult = () => {
  const {
    data, searchResults,inferenceResult, isInferenceResultShowing,
    toggleInferenceResult,
  } = useCandidate();

  const settings = {
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    slidesPerRows: 4,
    vertical: true,
    verticalSwiping: false,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  

  const sliderRef = React.createRef();

  // Simplify and centralize data selection logic
  const currentData = isInferenceResultShowing ? inferenceResult : searchResults.length > 0 ? searchResults : data;
  const hasData = currentData && currentData.length > 0;
  
  const renderPDFInfo = (item) => (
    <PDFInfo
      key={item.id}
      id={item.id}
      first_name={item.firstName || item.name}
      last_name={item.lastName}
      status={item.status || "N/A"}
      Age={item.Age}
      ageConfidence={item.confidence}
      languageSkills={item.languageSkills}
      Location = {item.Location}
      locationConfidence = {item.confidence}
      result={item.result}
      bulk={isInferenceResultShowing && inferenceResult && true}
    />
  );

  return (
    <div className="w-full">
      <div className="flex justify-start items-center px-10 mb-3 gap-4">
        <p onClick={toggleInferenceResult}  className={`hover:border-b-[3px] hover:border-[#F9BD44] text-[1rem] ${
            !isInferenceResultShowing ? "text-black font-bold border-b-[3px] border-[#F9BD44]" : "text-[#919191]"
          } `}>Result</p>
        <p onClick={toggleInferenceResult} className={`hover:border-b-[3px] hover:border-[#F9BD44] text-[1rem] ${
            isInferenceResultShowing ? "text-black font-bold border-b-[3px] border-[#F9BD44]" : "text-[#919191]"
          } `}>Inference Results</p>

      </div>
      <div className="min-h-fit p-4">
        {hasData ? (
          <Slider ref={sliderRef} {...settings}>
            {currentData.map(renderPDFInfo)}
          </Slider>
        ) : (
          // Optionally, render a message or a loader here
          <p>No data available.</p>
        )}
        {hasData && (
          <div className="text-center flex justify-evenly p-2">
            <button className="button" onClick={() => sliderRef.current.slickPrev()}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="button" onClick={() => sliderRef.current.slickNext()}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
