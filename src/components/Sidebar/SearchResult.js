import React from 'react'
import Slider from "react-slick";
import PDFInfo from "../Sidebar/PDFInfo";
import { useCandidate } from "../../store/Context";



const SearchResult = () => {
    const {
        data,
        searchResults,
      } = useCandidate();
      console.log(data)
    var settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        slidesPerRows: 3,
        vertical: true,
        verticalSwiping: false,
        swipeToSlide: true,
        focusOnSelect: true,
      };

      const sliderRef = React.createRef();
      console.log(sliderRef);
    
      const next = () => {
        sliderRef.current.slickNext();
      };
    
      const previous = () => {
        sliderRef.current.slickPrev();
      };
    
  return (
    <div className="w-full">
          <p className="px-10 mb-3">Results</p>
          <div className="min-h-fit">
            {searchResults.length > 0 ? (
              <Slider ref={sliderRef} {...settings}>
                {searchResults.map((item) => (
                  <PDFInfo
                    key={item.id}
                    id={item.id}
                    first_name={item.firstName}
                    last_name={item.lastName}
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
            )}
            <div className="text-center flex justify-evenly p-2 ">
              <button className="button" onClick={previous}>
                <i class="fa-solid fa-arrow-left"></i>
              </button>
              <button className="button" onClick={next}>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
  )
}

export default SearchResult