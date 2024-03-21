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
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    slidesPerRows: 3,
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
      // Add additional props as needed
    />
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-10 mb-3">
        <p>{isInferenceResultShowing ? 'Inference Results' : 'Result'}</p>
        <button onClick={toggleInferenceResult} className="px-4 border border-black text-black rounded-md hover:border-black hover:text-black hover:cursor-pointer">
          <i className="fa-solid fa-shuffle"></i>
        </button>
      </div>
      <div className="min-h-fit">
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
