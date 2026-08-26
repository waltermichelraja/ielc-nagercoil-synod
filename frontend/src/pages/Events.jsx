import { useEffect, useState } from"react";
import events from"../data/events.js";

function EventCards({items,showCircle=false,onImageClick}){
  const [expanded,setExpanded]=useState({});

  if(!items||items.length===0){
    return <p>No upcoming events have been published yet.</p>;
  }

  const toggleExpanded=(index)=>{
    setExpanded((current)=>({...current,[index]:!current[index]}));
  };

  return(
    <div className="card-grid">
      {items.map((event,i)=>{
        const isExpanded=Boolean(expanded[i]);
        const hasMore=Boolean(event.description&&event.description.length>180);

        return(
          <article className="card" key={i} style={{height:"350px",display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <button
              type="button"
              onClick={()=>event.image&&onImageClick(event.image,event.title)}
              disabled={!event.image}
              aria-label={event.image?`View image for ${event.title}`:"Event image unavailable"}
              style={{display:"block",width:"100%",height:"180px",padding:0,border:0,background:"transparent",cursor:event.image?"zoom-in":"default",flexShrink:0,overflow:"hidden"}}
            >
              {event.image&&(
                <img
                  src={event.image}
                  alt={event.title||"Event"}
                  style={{display:"block",width:"100%",height:"180px",objectFit:"cover",margin:0}}
                />
              )}
            </button>

            <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,paddingTop:"0.65rem"}}>
              {showCircle&&<p className="role">{event.circle}</p>}
              <h3>{event.title}</h3>
              <p className="role">{event.date}</p>

              <div style={{display:"flex",flexDirection:"column",minHeight:0,flex:1}}>
                <div
                  style={{
                    overflowY:isExpanded?"auto":"hidden",
                    maxHeight:isExpanded?"105px":"72px",
                    paddingRight:"0.25rem"
                  }}
                >
                  <p
                    style={{
                      marginBottom:0,
                      display:isExpanded?"block":"-webkit-box",
                      WebkitBoxOrient:"vertical",
                      WebkitLineClamp:isExpanded?"unset":3,
                      overflow:isExpanded?"visible":"hidden"
                    }}
                  >
                    {event.description}
                  </p>
                </div>

                {hasMore&&(
                  <button
                    type="button"
                    onClick={()=>toggleExpanded(i)}
                    style={{
                      alignSelf:"flex-start",
                      marginTop:"0.4rem",
                      padding:0,
                      border:0,
                      background:"transparent",
                      color:"var(--accent,#b44622)",
                      fontWeight:600,
                      cursor:"pointer"
                    }}
                  >
                    {isExpanded?"Show less":"More..."}
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ImageModal({image,title,onClose}){
  useEffect(()=>{
    if(!image)return;

    const handleKeyDown=(event)=>{
      if(event.key==="Escape")onClose();
    };

    document.addEventListener("keydown",handleKeyDown);
    document.body.style.overflow="hidden";

    return()=>{
      document.removeEventListener("keydown",handleKeyDown);
      document.body.style.overflow="";
    };
  },[image,onClose]);

  if(!image)return null;

  return(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title?`${title} image`:"Event image"}
      onClick={onClose}
      style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",background:"rgba(0,0,0,0.82)"}}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        style={{position:"absolute",top:"1rem",right:"1rem",width:"42px",height:"42px",border:"1px solid rgba(255,255,255,0.5)",borderRadius:"50%",background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:"1.5rem",lineHeight:1,cursor:"pointer",zIndex:1}}
      >
        ×
      </button>
      <img
        src={image}
        alt={title||"Event"}
        onClick={(event)=>event.stopPropagation()}
        style={{display:"block",maxWidth:"min(100%,1200px)",maxHeight:"calc(100vh - 4rem)",width:"auto",height:"auto",objectFit:"contain",boxShadow:"0 12px 40px rgba(0,0,0,0.45)"}}
      />
    </div>
  );
}

export default function Events(){
  const [selectedImage,setSelectedImage]=useState(null);

  return(
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">What's Happening</span>
          <h1>Events</h1>
          <h2>Upcoming Events</h2>
          <EventCards
            items={events.upcomingEvents}
            onImageClick={(image,title)=>setSelectedImage({image,title})}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Synod Events</h2>
          <EventCards
            items={events.synodEvents}
            onImageClick={(image,title)=>setSelectedImage({image,title})}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Circle Events</h2>
          <EventCards
            items={events.circleEvents}
            showCircle
            onImageClick={(image,title)=>setSelectedImage({image,title})}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>School Events</h2>
          <EventCards
            items={events.schoolEvents}
            onImageClick={(image,title)=>setSelectedImage({image,title})}
          />
        </div>
      </section>

      <ImageModal
        image={selectedImage?.image}
        title={selectedImage?.title}
        onClose={()=>setSelectedImage(null)}
      />
    </>
  );
}
