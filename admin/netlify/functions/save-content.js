import{deleteFile,getFile,putFile}from"./utils/github.js";
import{json,requireUser}from"./utils/http.js";

const CONTENT_ROOT="frontend/src/data/content/";
const CONTENT_PATHS=["about.json","circles.json","events.json","messages.json","overview.json","site.json","synodBearers.json","circulars.json"].map((name)=>`${CONTENT_ROOT}${name}`);
const ASSET_PREFIXES_BY_PATH={
  "frontend/src/data/content/events.json":["/images/events/"],
  "frontend/src/data/content/synodBearers.json":["/images/people/"],
  "frontend/src/data/content/circulars.json":["/images/circulars/"],
};

export async function handler(event,context){
  try{
    const user=requireUser(context);
    if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed."});
    const{path,content,sha}=JSON.parse(event.body||"{}");
    if(!path||content===undefined||!sha)return json(400,{error:"Request must include path, content, and sha."});
    if(!isAllowedContentPath(path))return json(403,{error:"This file is not editable from the admin app."});
    const jsonString=JSON.stringify(content,null,2)+"\n";
    const contentBase64=Buffer.from(jsonString,"utf-8").toString("base64");
    const editorName=user.user_metadata?.full_name||user.email||"Admin";
    let assetsToCheck=[];
    const assetPrefixes=ASSET_PREFIXES_BY_PATH[path];
    let current;
    if(assetPrefixes){
      current=await getFile(path);
      if(!current||current.sha!==sha)return json(409,{error:"This file changed since you opened it. Please reload the page and re-apply your edit."});
      const oldContent=decodeJsonContent(current.contentBase64);
      const oldAssets=collectAssetPaths(oldContent,assetPrefixes);
      const newAssets=collectAssetPaths(content,assetPrefixes);
      assetsToCheck=[...oldAssets].filter((asset)=>!newAssets.has(asset));
    }
    try{
      const result=await putFile({path,contentBase64,sha,message:`content: update ${shortName(path)} (via admin, by ${editorName})`});
      const deletedImages=[];
      const imageDeleteErrors=[];
      if(assetsToCheck.length){
        const usedAnywhere=await collectContentAssetReferences(assetsToCheck,path,content);
        for(const assetPath of assetsToCheck){
          if(usedAnywhere.has(assetPath))continue;
          try{
            const repoPath=publicAssetPathToRepoPath(assetPath);
            const assetFile=await getFile(repoPath);
            if(!assetFile)continue;
            await deleteFile({path:repoPath,sha:assetFile.sha,message:`content: remove unused upload ${repoPath.split("/").pop()} (via admin, by ${editorName})`});
            deletedImages.push(assetPath);
          }catch(err){imageDeleteErrors.push({path:assetPath,error:err.message});}
        }
      }
      return json(200,{sha:result.sha,deletedImages,imageDeleteErrors});
    }catch(err){
      if(err.status===409)return json(409,{error:"This file changed since you opened it. Please reload the page and re-apply your edit."});
      throw err;
    }
  }catch(err){return json(err.statusCode||500,{error:err.message||"Unexpected error."});}
}

function isAllowedContentPath(path){return path.startsWith(CONTENT_ROOT)&&path.endsWith(".json");}
function shortName(path){return path.split("/").pop();}
function decodeJsonContent(contentBase64){try{return JSON.parse(Buffer.from(contentBase64,"base64").toString("utf-8"));}catch{throw new Error("The current file content could not be read safely.");}}
function collectAssetPaths(value,prefixes,found=new Set()){if(typeof value==="string"){if(prefixes.some((prefix)=>value.startsWith(prefix)))found.add(value);}else if(Array.isArray(value)){for(const item of value)collectAssetPaths(item,prefixes,found);}else if(value&&typeof value==="object"){for(const key of Object.keys(value))collectAssetPaths(value[key],prefixes,found);}return found;}
async function collectContentAssetReferences(candidatePaths,currentPath,currentContent){const candidates=new Set(candidatePaths);const used=new Set();collectMatchingAssetPaths(currentContent,candidates,used);for(const path of CONTENT_PATHS){if(path===currentPath)continue;const file=await getFile(path);if(!file)continue;const content=decodeJsonContent(file.contentBase64);collectMatchingAssetPaths(content,candidates,used);if(used.size===candidates.size)break;}return used;}
function collectMatchingAssetPaths(value,candidates,found){if(typeof value==="string"){if(candidates.has(value))found.add(value);return;}if(Array.isArray(value)){for(const item of value)collectMatchingAssetPaths(item,candidates,found);return;}if(value&&typeof value==="object"){for(const key of Object.keys(value))collectMatchingAssetPaths(value[key],candidates,found);}}
function publicAssetPathToRepoPath(publicPath){if(!/^\/images\/(people|events|circulars)\/[a-zA-Z0-9._%+-]+$/.test(publicPath))throw new Error(`Unsafe asset path: ${publicPath}`);return`frontend/public${publicPath}`;}
