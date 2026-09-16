import fs from"fs";
import path from"path";
import {fileURLToPath} from"url";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const eventsDirectory=path.resolve(__dirname,"../public/images/events");
const outputFile=path.resolve(__dirname,"../src/data/eventImages.js");

const supportedExtensions=[".jpg",".jpeg",".png",".webp",".gif",".svg"];

if(!fs.existsSync(eventsDirectory)){
  console.warn("Event images directory not found:",eventsDirectory);
  fs.writeFileSync(outputFile,"const eventImages=[];\n\nexport default eventImages;\n");
  process.exit(0);
}

const files=fs
  .readdirSync(eventsDirectory,{withFileTypes:true})
  .filter(entry=>entry.isFile())
  .map(entry=>entry.name)
  .filter(filename=>supportedExtensions.includes(path.extname(filename).toLowerCase()))
  .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));

const images=files.map(filename=>`/images/events/${encodeURIComponent(filename)}`);

const output=`const eventImages=${JSON.stringify(images,null,2)};\n\nexport default eventImages;\n`;
fs.writeFileSync(outputFile,output);
console.log(`Generated event image manifest with ${images.length} image(s).`);
