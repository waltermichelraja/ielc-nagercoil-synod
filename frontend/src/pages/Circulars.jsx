import{useEffect,useState}from"react";
import circulars from"../data/circulars.js";

function formatDate(value){
  if(!value)return"";
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return value;
  return new Intl.DateTimeFormat("en-IN",{month:"short",day:"numeric",year:"numeric"}).format(date).toUpperCase();
}

function attachmentUrl(path){
  if(!path)return"";
  return path.startsWith("http")?path:path;
}

function CircularModal({item,onClose}){
  useEffect(()=>{
    if(!item)return;
    const handleKeyDown=(event)=>{if(event.key==="Escape")onClose();};
    document.addEventListener("keydown",handleKeyDown);
    document.body.style.overflow="hidden";
    return()=>{document.removeEventListener("keydown",handleKeyDown);document.body.style.overflow="";};
  },[item,onClose]);

  if(!item)return null;
  const attachment=attachmentUrl(item.attachment);
  const isImage=/\.(png|jpe?g|webp|svg)(\?.*)?$/i.test(attachment);
  const isPdf=/\.pdf(\?.*)?$/i.test(attachment);

  return(
    <div className="circular-modal" role="dialog" aria-modal="true" aria-labelledby="circular-modal-title" onClick={onClose}>
      <div className="circular-modal-panel" onClick={(event)=>event.stopPropagation()}>
        <button type="button" className="circular-modal-close" onClick={onClose} aria-label="Close circular">×</button>
        <div className="circular-modal-meta">
          <span>＊ {formatDate(item.date)}</span>
          <span>＊ {(item.category||"GENERAL").toUpperCase()}</span>
        </div>
        <h2 id="circular-modal-title">{item.subject}</h2>
        {item.message&&<div className="circular-modal-message">{item.message}</div>}
        {attachment&&(
          <div className="circular-modal-attachment">
            {isImage&&<img src={attachment} alt={item.subject||"Circular attachment"}/>} 
            {isPdf&&<iframe src={attachment} title={`${item.subject||"Circular"} attachment`}/>} 
            {!isImage&&!isPdf&&<a className="btn" href={attachment} target="_blank" rel="noreferrer">Open attachment</a>}
            {(isImage||isPdf)&&<a className="circular-attachment-link" href={attachment} target="_blank" rel="noreferrer">Open attachment in a new tab</a>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Circulars(){
  const[selected,setSelected]=useState(null);
  const items=[...(circulars||[])].sort((a,b)=>new Date(b.date||0)-new Date(a.date||0));

  return(
    <>
      <section className="section circulars-section">
        <div className="container">
          <span className="eyebrow">Official Notices</span>
          <h1>Circulars</h1>
          <p className="circulars-intro">Circulars, opportunities and official information from the IELC Nagercoil Synod.</p>
          {items.length===0?<p className="circulars-empty">No circulars have been published yet.</p>:(
            <div className="circular-list">
              {items.map((item,index)=>(
                <article className="circular-item" key={`${item.date||""}-${item.subject||""}-${index}`}>
                  <div className="circular-meta">
                    <span>＊ {formatDate(item.date)}</span>
                    <span>＊ {(item.category||"GENERAL").toUpperCase()}</span>
                  </div>
                  <button type="button" className="circular-subject" onClick={()=>setSelected(item)}>{item.subject}</button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CircularModal item={selected} onClose={()=>setSelected(null)}/>
    </>
  );
}
