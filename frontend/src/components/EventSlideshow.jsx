import{useEffect,useState}from"react";
import eventImages from"../data/eventImages.js";

const SLIDE_DURATION=10000;

export default function EventSlideshow(){
  const[index,setIndex]=useState(0);
  const total=eventImages.length;

  useEffect(()=>{
    if(total<=1)return undefined;

    const timer=window.setInterval(()=>{
      setIndex(current=>(current+1)%total);
    },SLIDE_DURATION);

    return()=>window.clearInterval(timer);
  },[total]);

  if(total===0)return null;

  const previousSlide=()=>{
    setIndex(current=>(current-1+total)%total);
  };

  const nextSlide=()=>{
    setIndex(current=>(current+1)%total);
  };

  return(
    <section
      className="event-slideshow"
      aria-label="IELC Nagercoil Synod events slideshow"
    >
      <div className="event-slideshow__slides">
        {eventImages.map((image,imageIndex)=>(
          <div
            key={image}
            className={`event-slideshow__slide${imageIndex===index?" is-active":""}`}
            aria-hidden={imageIndex!==index}
          >
            <div
              className="event-slideshow__background"
              style={{backgroundImage:`url("${image}")`}}
            />

            <img
              src={image}
              alt={`Synod event ${imageIndex+1}`}
              className="event-slideshow__image"
              loading={imageIndex===index?"eager":"lazy"}
            />
          </div>
        ))}
      </div>

      <div className="event-slideshow__topbar">
        {/* <span className="event-slideshow__counter">
          {index+1} / {total}
        </span> */}
        <div className="event-slideshow__dots">
          {eventImages.map((image,imageIndex)=>(
            <button
              key={image}
              type="button"
              className={`event-slideshow__dot${imageIndex===index?" is-active":""}`}
              onClick={()=>setIndex(imageIndex)}
              aria-label={`Go to slide ${imageIndex+1}`}
              aria-current={imageIndex===index?"true":undefined}
            />
          ))}
        </div>
      </div>

      {total>1&&(
        <>
          <button
            type="button"
            className="event-slideshow__nav event-slideshow__prev"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            &#8249;
          </button>

          <button
            type="button"
            className="event-slideshow__nav event-slideshow__next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#8250;
          </button>
        </>
      )}
    </section>
  );
}