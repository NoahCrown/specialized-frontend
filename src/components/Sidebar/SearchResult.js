import React from "react";
import Slider from "react-slick";
import PDFInfo from "../Sidebar/PDFInfo";
import { useCandidate } from "../../store/Context";

const SearchResult = () => {
  const { data, searchResults, isBulkInferenceShowing, showBulkInferenceData, bulkInference } =
    useCandidate();
    console.log(bulkInference)
  var settings = {
    infinite: false,
    speed: 700,
    slidesToShow: 3, // Ensure that it always shows three items
    slidesToScroll: 2,
    arrows: false,
    slidesPerRows: 3, // Changed from slidesPerRows to slidesPerRow
    vertical: true,
    verticalSwiping: false,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const sliderRef = React.createRef();

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-10 mb-3 ">
        <p className="">{isBulkInferenceShowing ? 'Bulk Inference Result' : 'Result'}</p>
        <button
          onClick={showBulkInferenceData}
          className="border border-black border-solid text-black w-1/3 rounded-md hover:border-black hover:text-black hover:cursor-pointer"
        >
          <i className="fa-solid fa-shuffle"></i> {/* Changed class to className */}
        </button>
      </div>
      <div className="min-h-fit">
        {isBulkInferenceShowing ? 
          <Slider ref={sliderRef} {...settings}>
            {bulkInference && bulkInference.map((item) => (
              <PDFInfo
                key={item.id}
                id={item.id}
                first_name={item.name}
                status={item.status}
                Age= {item.Age}
                ageConfidence = {item.confidence}
                languageSkills = {item.languageSkills }
                Location = {item.Location}
                locationConfidence = {item.confidence}
                bulk={true}
              />
            ))}
          </Slider> // Render nothing when bulk inference is showing
        : (searchResults.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {searchResults.map((item) => (
              <PDFInfo
                key={item.id}
                id={item.id}
                first_name={item.name}
                status={item.status || "N/A"}
              />
            ))}
          </Slider>
        ) : (
          <Slider {...settings} ref={sliderRef}>
            {data.map((item) => (
              <PDFInfo
                key={item.id}
                id={item.id}
                first_name={item.firstName}
                last_name={item.lastName}
                status={item.status || "N/A"}
              />
            ))}
          </Slider>
        ))}
        <div className="text-center flex justify-evenly p-2 ">
          <button className="button" onClick={previous}>
            <i className="fa-solid fa-arrow-left"></i> {/* Changed class to className */}
          </button>
          <button className="button" onClick={next}>
            <i className="fa-solid fa-arrow-right"></i> {/* Changed class to className */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
