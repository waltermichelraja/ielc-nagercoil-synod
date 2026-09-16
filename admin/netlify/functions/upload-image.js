import crypto from"node:crypto";
import{getFile,putFile}from"./utils/github.js";
import{json,requireUser}from"./utils/http.js";

const MAX_BYTES=6*1024*1024;
const IMAGE_TYPES=new Set(["image/png","image/jpeg","image/webp","image/svg+xml"]);

export async function handler(event,context){
  try{
    const user=requireUser(context);
    if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed."});
    const{folder="",filename,dataUrl}=JSON.parse(event.body||"{}");
    if(!filename||!dataUrl)return json(400,{error:"Request must include filename and dataUrl."});
    const safeFolder=sanitizeSegment(folder);
    const safeFilename=sanitizeFilename(filename);
    if(!safeFilename)return json(400,{error:"Invalid filename."});
    const parsed=parseDataUrl(dataUrl);
    if(!parsed)return json(400,{error:"The selected file could not be decoded for upload."});
    const mimeType=parsed.mimeType.toLowerCase();
    const base64Data=parsed.base64Data;
    const isPdf=mimeType==="application/pdf";
    const isImage=IMAGE_TYPES.has(mimeType);
    if(!isImage&&!isPdf)return json(400,{error:`Unsupported file type: ${mimeType}`});
    if(isPdf&&safeFolder!=="circulars")return json(400,{error:"PDF uploads are only supported for circulars."});
    const buffer=Buffer.from(base64Data,"base64");
    if(!buffer.length)return json(400,{error:"The selected file is empty or could not be decoded."});
    if(buffer.length>MAX_BYTES)return json(400,{error:`File is too large (${(buffer.length/1024/1024).toFixed(1)}MB). Please use a file under 6MB.`});
    const contentHash=crypto.createHash("sha256").update(buffer).digest("hex").slice(0,10);
    const storedFilename=withHashSuffix(safeFilename,contentHash);
    const repoPath=safeFolder?`frontend/public/images/${safeFolder}/${storedFilename}`:`frontend/public/images/${storedFilename}`;
    const existing=await getFile(repoPath);
    const editorName=user.user_metadata?.full_name||user.email||"Admin";
    const result=await putFile({path:repoPath,contentBase64:base64Data,sha:existing?.sha,message:`content: ${existing?"update":"add"} ${isPdf?"attachment":"image"} ${storedFilename} (via admin, by ${editorName})`});
    return json(200,{sha:result.sha,publicPath:safeFolder?`/images/${safeFolder}/${storedFilename}`:`/images/${storedFilename}`});
  }catch(err){return json(err.statusCode||500,{error:err.message||"Unexpected error."});}
}

function parseDataUrl(dataUrl){
  if(typeof dataUrl!=="string")return null;
  const commaIndex=dataUrl.indexOf(",");
  if(commaIndex<0)return null;
  const header=dataUrl.slice(0,commaIndex);
  const base64Data=dataUrl.slice(commaIndex+1).replace(/\s/g,"");
  const match=/^data:([^;,]+)(?:;[^,]*)*;base64$/i.exec(header);
  if(!match||!base64Data)return null;
  return{mimeType:match[1],base64Data};
}

function withHashSuffix(filename,hash){const dotIndex=filename.lastIndexOf(".");const base=filename.slice(0,dotIndex);const ext=filename.slice(dotIndex);return`${base}-${hash}${ext}`;}
function sanitizeSegment(segment){return String(segment||"").toLowerCase().replace(/[^a-z0-9-]/g,"");}
function sanitizeFilename(filename){const name=String(filename||"").trim().toLowerCase().replace(/\s+/g,"");const match=/^([a-z0-9-_]+)\.(png|jpe?g|webp|svg|pdf)$/.exec(name);return match?match[0]:null;}
