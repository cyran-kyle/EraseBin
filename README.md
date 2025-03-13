# EraseBin  

EraseBin is a self-destructing pastebin focused on privacy. It encrypts data, generates short links, and deletes pastes after viewing.  

## Features  
- Burn-on-read pastes  
- End-to-end encryption  
- Short random URLs  
- Optional password  

## Usage  
### Create a Paste  
```sh
curl -X POST https://yourdomain.com/create -H "Content-Type: application/json" -d '{"content":"Your text"}'
```  

### Retrieve a Paste  
```sh
curl https://yourdomain.com/{paste_id}
```  

## Installation  
```sh
git clone https://github.com/IRON-M4N/EraseBin.git  
cd EraseBin  
npm install  
npm start  
```  

<h6>© <a href="https://github.com/IRON-M4N" target="_blank">IRON-M4N</a></h6>
