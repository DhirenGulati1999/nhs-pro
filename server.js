// const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const https = require('https');
const http = require('http');
const router = require('next/router')
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const httpProxy = require('http-proxy');
const { readFileSync } = require('fs');
const axios = require('axios');
const querystring = require('querystring');
const formidable = require('formidable');
const { createServer } =https;
const dev = process.env.NODE_ENV !== 'production'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const port = process.env.PORT || 443;
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
};

const hostname ="localhost"

app.prepare().then(() => {
  createServer(httpsOptions,(req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (parsedUrl.pathname.toLowerCase().includes('/sso/startsso')) {  
            const queryString = new URLSearchParams(parsedUrl.query).toString();
            const externalApiOptions = {
                hostname:hostname,
                port: 7149,
                path: parsedUrl.pathname,
                method: 'GET',  
                search:queryString,
                headers:{...req.headers,host:hostname}
            };

          const externalApiReq = https.request(externalApiOptions, (externalApiRes) => {
            let data = '';
      
            externalApiRes.on('data', (chunk) => {
              data += chunk;
            });
      
            externalApiRes.on('end', () => {
              // Process the response from the external API
              // console.log('Response from external API:', data);
              res.writeHead(externalApiRes.statusCode, externalApiRes.headers)
              res.end(data)
            });
          });

          externalApiReq.on('error', (error) => {
            console.error('Error making external API request:', error);
          
            // Respond to the client with an error status and message
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          });

          externalApiReq.end();
      
    }
    else if(parsedUrl.pathname.toLowerCase().includes('/sso/assertionconsumerservice')){
          // Parse the form data
          const form = new formidable.IncomingForm();
      // console.log(req,"req")

          // Parse the form data
          form.parse(req, (err, fields, files) => {
            if (err) {
              console.error('Error parsing form data:', err);
    
              // Respond with an error to the client
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
              return;
            }
    
            // Log or process the form fields and files
            // console.log('Form Fields:', fields);
            // console.log('Uploaded Files:', files);

            const postData =  querystring.stringify(fields);
            const externalApiOptions = {
                hostname:hostname,
                port: 7149,
                path: parsedUrl.pathname,        
                method:'POST',
                headers:  {
                  ...req.headers,host:hostname,
                  },
                            };

            const externalApiReq = https.request(externalApiOptions, (externalApiRes) => {
            let data = []      
            externalApiRes.on('data', (chunk) => {
              data.push(chunk)
            });
                        externalApiRes.on('end', () => {
                // Concatenate the chunks to form the complete response data
                const responseData = Buffer.concat(data).toString('utf8');
                 // Process the response from the external API
                console.log('Response from external API:', responseData);
                                res.writeHead(302, {location:"/"}) 
                res.end(responseData)
            });
        });

            externalApiReq.on('error', (error) => {
              console.error('Error making external API request:', error);
              // Respond to the client with an error status and message
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            });
            // Write the form data to the forwarded request
            externalApiReq.write(postData);
            externalApiReq.end();
          
        });
    }
    else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on https://localhost:${port}`)
  })
})