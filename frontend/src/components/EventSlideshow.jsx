import{useEffect,useState}from"react";
import eventImages from"../data/eventImages.js";

const SLIDE_DURATION=10000;

export default function EventSlideshow(){
  const[index,setIndex]=useState(0);

  useEffect(()=>{
    if(eventImages.length<=1)return undefined;

    const timer=window.setInterval(()=>{
      setIndex(current=>(current+1)%eventImages.length);
    },SLIDE_DURATION);

    return()=>window.clearInterval(timer);
  },[]);

  if(eventImages.length===0)return null;

  return(
    <section
      className="event-slideshow"
      aria-label="IELC Nagercoil Synod events slideshow"
    >
      <div className="event-slideshow__slides">
        {eventImages.map((image,imageIndex)=>(
          <img
            key={image}
            src={image}
            alt=""
            className={`event-slideshow__image${imageIndex===index?" is-active":""}`}
            aria-hidden={imageIndex!==index}
          />
        ))}
      </div>

      <div className="event-slideshow__overlay" aria-hidden="true"/>

      {eventImages.length>1&&(
        <div className="event-slideshow__dots" aria-hidden="true">
          {eventImages.map((image,imageIndex)=>(
            <span
              key={image}
              className={`event-slideshow__dot${imageIndex===index?" is-active":""}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
