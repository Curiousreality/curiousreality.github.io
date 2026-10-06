import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8',
  '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'
};

function safePath(urlPath){
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const raw = decoded === '/' ? '/index.html' : decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  const full = path.resolve(PUBLIC, `.${raw}`);
  return full.startsWith(PUBLIC) ? full : path.join(PUBLIC, '404.html');
}

createServer(async (req,res)=>{
  try {
    const file = safePath(req.url);
    const data = await readFile(file);
    res.statusCode = 200;
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control','no-cache');
    res.end(data);
  } catch {
    try {
      const data = await readFile(path.join(PUBLIC,'404.html'));
      res.statusCode = 404;
      res.setHeader('Content-Type','text/html; charset=utf-8');
      res.end(data);
    } catch {
      res.statusCode = 500;
      res.end('Preview server error');
    }
  }
}).listen(port,()=>console.log(`Curious Reality preview: http://localhost:${port}`));
