import{useState}from"react";
import{uploadImage}from"../api.js";

const FRONTEND_URL=import.meta.env.VITE_FRONTEND_URL||"";

export default function FileUploadField({folder,value,onChange,accept}){
  const[uploading,setUploading]=useState(false);
  const[error,setError]=useState("");
  const previewSrc=value?(value.startsWith("http")?value:`${FRONTEND_URL}${value}`):null;
  const isImage=/\.(png|jpe?g|webp|svg)$/i.test(value||"");
  const isPdf=/\.pdf$/i.test(value||"");
  async function handleFileChange(event){const file=event.target.files?.[0];if(!file)return;setError("");setUploading(true);try{const result=await uploadImage(file,folder);onChange(result.publicPath);}catch(err){setError(err.message||"Upload failed. Please try again.");}finally{setUploading(false);event.target.value="";}}
  return(<div className="file-field"><div className="file-field-preview">{previewSrc&&isImage?<img src={previewSrc} alt=""/>:previewSrc&&isPdf?<span className="file-field-pdf">PDF</span>:<span>No attachment yet</span>}</div><div className="file-field-controls"><div className="file-field-actions"><label className="btn-file">{uploading?"Uploading…":value?"Replace attachment":"Choose attachment"}<input type="file" accept={accept} onChange={handleFileChange} disabled={uploading} hidden/></label>{value&&<button type="button" className="btn-danger" onClick={()=>onChange("")} disabled={uploading}>Remove</button>}</div>{value&&<p className="image-field-path">{value}</p>}{error&&<p className="field-error">{error}</p>}</div></div>);
}
