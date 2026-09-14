import crypto from"node:crypto";
import{getFile,putFile}from"./utils/github.js";
import{json,requireUser}from"./utils/http.js";

const MAX_BYTES=6*1024*1024;
const IMAGE_TYPES=["image/png","image/jpeg","image/webp","image/svg+xml"];

export async function handler(event,context){
  try{
    const user=requireUser(context);
    if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed."});
    const{folder="",filename,dataUrl}=JSON.parse(event.body||"{}");
    if(!filename||!dataUrl)return json(400,{error:"Request must include filename and dataUrl."});
    const safeFolder=sanitizeSegment(folder);
    const safeFilename=sanitizeFilename(filename);
    if(!safeFilename)return json(400,{error:"Invalid filename."});
    const match=/^data:([a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
    if(!match)return json(400,{error:"dataUrl must be a base64-encoded image or PDF."});
    const[,mimeType,base64Data]=match;
    const isPdf=mimeType==="application/pdf";
    const isImage=IMAGE_TYPES.includes(mimeType);
    if(!isImage&&!isPdf)return json(400,{error:`Unsupported file type: ${mimeType}`});
    if(isPdf&&safeFolder!=="circulars")return json(400,{error:"PDF uploads are only supported for circulars."});
    const approxBytes=Math.ceil(base64Data.length*3/4);
    if(approxBytes>MAX_BYTES)return json(400,{error:`File is too large (${(approxBytes/1024/1024).toFixed(1)}MB). Please use a file under 6MB.`});
    const buffer=Buffer.from(base64Data,"base64");
    const contentHash=crypto.createHash("sha256").update(buffer).digest("hex").slice(0,10);
    const storedFilename=withHashSuffix(safeFilename,contentHash);
    const repoPath=safeFolder?`frontend/public/images/${safeFolder}/${storedFilename}`:`frontend/public/images/${storedFilename}`;
    const existing=await getFile(repoPath);
    const editorName=user.user_metadata?.full_name||user.email||"Admin";
    const result=await putFile({path:repoPath,contentBase64:base64Data,sha:existing?.sha,message:`content: ${existing?"update":"add"} ${isPdf?"attachment":"image"} ${storedFilename} (via admin, by ${editorName})`});
    return json(200,{sha:result.sha,publicPath:safeFolder?`/images/${safeFolder}/${storedFilename}`:`/images/${storedFilename}`});
  }catch(err){return json(err.statusCode||500,{error:err.message||"Unexpected error."});}
}

function withHashSuffix(filename,hash){const dotIndex=filename.lastIndexOf(".");const base=filename.slice(0,dotIndex);const ext=filename.slice(dotIndex);return`${base}-${hash}${ext}`;}
function sanitizeSegment(segment){return String(segment||"").toLowerCase().replace(/[^a-z0-9-]/g,"");}
function sanitizeFilename(filename){const name=String(filename||"").trim().toLowerCase().replace(/\s+/g,"");const match=/^([a-z0-9-_]+)\.(png|jpe?g|webp|svg|pdf)$/.exec(name);return match?match[0]:null;}
