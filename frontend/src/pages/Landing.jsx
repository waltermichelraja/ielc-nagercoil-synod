import{useEffect,useRef,useState}from"react";
import{Link,useNavigate}from"react-router-dom";
import site from"../data/site.js";
import{NAV_ITEMS}from"../components/Header.jsx";
import{FacebookIcon,InstagramIcon,YouTubeIcon,WhatsAppIcon,XIcon,SearchIcon,MenuIcon,CloseIcon}from"../components/icons.jsx";

const SOCIAL_LINKS=[
  {key:"facebook",label:"Facebook",Icon:FacebookIcon},
  {key:"instagram",label:"Instagram",Icon:InstagramIcon},
  {key:"youtube",label:"YouTube",Icon:YouTubeIcon},
  {key:"whatsapp",label:"WhatsApp",Icon:WhatsAppIcon},
  {key:"twitter",label:"X (Twitter)",Icon:XIcon},
];

export default function Landing(){
  const[menuOpen,setMenuOpen]=useState(false);
  const[searchOpen,setSearchOpen]=useState(false);
  const[query,setQuery]=useState("");
  const searchInputRef=useRef(null);
  const navigate=useNavigate();
  const social=site.social||{};
  const landing=site.landing||{};

  useEffect(()=>{
    function onKeyDown(e){
      if(e.key==="Escape"){
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown",onKeyDown);
    return()=>window.removeEventListener("keydown",onKeyDown);
  },[]);

  useEffect(()=>{
    if(searchOpen&&searchInputRef.current)searchInputRef.current.focus();
  },[searchOpen]);

  const matches=query.trim()?NAV_ITEMS.filter(item=>item.label.toLowerCase().includes(query.trim().toLowerCase())):NAV_ITEMS;

  function handleSearchSubmit(e){
    e.preventDefault();
    if(matches.length>0){
      navigate(matches[0].to);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return(
    <div className="landing">
      <div className="landing-bg" style={{backgroundImage:`url(${landing.heroImage||"/images/placeholder-hero.svg"})`}} aria-hidden="true"/>
      <div className="landing-overlay" aria-hidden="true"/>
      <div className="landing-topbar">
        <ul className="landing-social">
          {SOCIAL_LINKS.map(({key,label,Icon})=>{
            const href=social[key];
            return(
              <li key={key}>
                <a
                  href={href||"#"}
                  aria-label={label}
                  target={href?"_blank":undefined}
                  rel={href?"noreferrer":undefined}
                  className={href?undefined:"is-placeholder"}
                  onClick={e=>{if(!href)e.preventDefault();}}
                  title={href?label:`${label} (link not set yet)`}
                >
                  <Icon/>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="landing-actions">
          <button className="landing-icon-btn" aria-label="Search" aria-expanded={searchOpen} onClick={()=>setSearchOpen(v=>!v)}><SearchIcon/></button>
          <button className="landing-icon-btn" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="landing-drawer" onClick={()=>setMenuOpen(true)}><MenuIcon/></button>
        </div>
      </div>

      <div className="landing-content">
        <img className="landing-logo" src="/images/ielc-logo.png" alt="IELC logo"/>
        <h1>Welcome to the <br/>{site.shortTitle}</h1>
        <p className="landing-tagline" style={{fontSize:"1.3rem",fontWeight:400,letterSpacing:"0.025em",lineHeight:1.5,marginTop:"0.35rem"}}>{site.tagline}</p>
        {landing.motto&&(
          <p className="landing-motto" style={{fontFamily:"Georgia,\"Times New Roman\",serif",fontSize:"clamp(1.45rem,3vw,2rem)",fontWeight:800,letterSpacing:"0.05em",lineHeight:1.3,marginTop:"0.65rem",textShadow:"0 2px 3px rgba(0,0,0,0.2)"}}>
            {landing.motto.split(", ").map((phrase,i,arr)=>(
              <span key={phrase} className="motto-phrase">
                {phrase}{i<arr.length-1?",":""}{i<arr.length-1?" ":""}
              </span>
            ))}
          </p>
        )}
        <Link to="/home" className="btn landing-explore">Explore</Link>
      </div>


      {searchOpen&&(
        <div className="landing-search-overlay" role="dialog" aria-modal="true" aria-label="Search the site">
          <button className="landing-overlay-close" aria-label="Close search" onClick={()=>setSearchOpen(false)}><CloseIcon/></button>
          <form className="landing-search-form" onSubmit={handleSearchSubmit}>
            <SearchIcon/>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search pages — Message, Events, Overview..."
              value={query}
              onChange={e=>setQuery(e.target.value)}
            />
          </form>
          <ul className="landing-search-results">
            {matches.length===0&&<li className="landing-search-empty">No pages match "{query}"</li>}
            {matches.map(item=>(
              <li key={item.to}>
                <Link to={item.to} onClick={()=>setSearchOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`landing-drawer-backdrop${menuOpen?" is-open":""}`} onClick={()=>setMenuOpen(false)}/>
      <nav id="landing-drawer" className={`landing-drawer${menuOpen?" is-open":""}`} aria-hidden={!menuOpen}>
        <button className="landing-overlay-close" aria-label="Close menu" onClick={()=>setMenuOpen(false)}><CloseIcon/></button>
        <ul>
          {NAV_ITEMS.map(item=>(
            <li key={item.to}>
              <Link to={item.to} onClick={()=>setMenuOpen(false)}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="landing-drawer-social">
          {SOCIAL_LINKS.map(({key,label,Icon})=>{
            const href=social[key];
            if(!href)return null;
            return(
              <li key={key}>
                <a href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon/></a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
