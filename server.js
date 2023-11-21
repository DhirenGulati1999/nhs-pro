// const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const https = require('https');
const http = require('http');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const httpProxy = require('http-proxy');
const { readFileSync } = require('fs');
const axios = require('axios');
const querystring = require('querystring');
const formidable = require('formidable');
const { createServer } =https;
const dev = process.env.NODE_ENV !== 'production'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const port = process.env.PORT || 80;
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
};

// class CustomAgent extends https.Agent {
//     // Override the createConnection method to intercept requests
//     createConnection(options, callback) {
//       console.log('Intercepted request:', options);
//       // You can modify options or perform other actions here before creating the connection
//       return super.createConnection(options, callback);
//     }
//   }

//   const externalApiOptions = {
//     // other options...
//     agent: new CustomAgent({ protocol: 'https:' }),
//   };
  

app.prepare().then(() => {
  createServer(httpsOptions,async (req, res) => {
    const parsedUrl = parse(req.url, true);
    // console.log(parsedUrl.pathname)
    // if(parsedUrl)

    
    if (parsedUrl.pathname.toLowerCase().includes('/sso/startsso')) {  
            const queryString = new URLSearchParams(parsedUrl.query).toString();
            const externalApiOptions = {
                hostname: 'localhost',
                port: 7149,
                path: parsedUrl.pathname,
                method: 'GET',  
                search:queryString
            };
      

          const externalApiReq = https.request(externalApiOptions, (externalApiRes) => {
            let data = '';
      
            externalApiRes.on('data', (chunk) => {
              data += chunk;
            });
      
            externalApiRes.on('end', () => {
              // Process the response from the external API
              console.log('Response from external API:', data);
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
        // fetch("https://sprint.newhomesourceprofessional.com/").then((data)=>console.log(data)).catch((e)=>console.log(e))
        // console.log(req,"req first")
        // forwardRequest(req, res, 'https://sprint.newhomesourceprofessional.com/abor/sso/startsso');

        //   proxy.web(req, res, { target: 'https://sprint.newhomesourceprofessional.com/abor/sso/startsso' });
      
        //   // Handle any errors during the external API request
        //   externalApiReq.on('error', (error) => {
        //     console.error('Error making external API request:', error);
      
        //     // Respond with an error to the client
        //     res.writeHead(500, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ error: 'Internal Server Error' }));
        //   });
      
    }else if(parsedUrl.pathname.toLowerCase().includes('/sso/assertionconsumerservice')){
          // Parse the form data
          const form = new formidable.IncomingForm();
      console.log(req,"req")

      const cookies = parseCookies(req);

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
            console.log('Form Fields:', fields);
            console.log('Uploaded Files:', files);

            const postData = querystring.stringify(fields);
            const externalApiOptions = {
                hostname: 'localhost',
                port: 7149,
                path: parsedUrl.pathname,        
                method:'POST',
                headers:  {
                  ...req.headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData),
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
                res.writeHead(externalApiRes.statusCode, externalApiRes.headers) 
                res.end(responseData)
            });

            externalApiReq.on('error', (error) => {
                console.error('Error making external API request:', error);
                // Respond to the client with an error status and message
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            });
        });
            // Write the form data to the forwarded request
            externalApiReq.write(postData);
            externalApiReq.end();
          
        });
    }
    else{
            handle(req, res, parsedUrl);
    }

    // }
  }).listen(443, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:443');
  });
})


function forwardRequest(req, res, targetUrl) {
    const targetOptions = parse(targetUrl);
    targetOptions.method = req.method;
    targetOptions.headers = req.headers;
    targetOptions.rejectUnauthorized = false; // Disable SSL/TLS certificate verification
    targetOptions.agent = new CustomAgent({ protocol: 'https:' });

    const targetReq = https.request(targetOptions, (targetRes) => {
        console.log("here inside arget req")
        if (targetRes.statusCode >= 200 && targetRes.statusCode < 300) {
            console.log('Request to external API successful',targetRes);
          }
      res.writeHead(targetRes.statusCode, targetRes.headers);
  
      targetRes.pipe(res, {
        end: true
      });
    });
  
    req.pipe(targetReq, {
      end: true
    });
    console.log("here")
    targetReq.on('error', (error) => {
      console.error('Error making external API request:', error);
  
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });
  }


  function parseCookies(req) {
    const cookieHeader = req.headers.cookie;
  
    if (cookieHeader) {
      const cookies = {};
      cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        const name = parts[0].trim();
        const value = parts[1].trim();
        cookies[name] = value;
      });
      return cookies;
    }
  
    return {};
  }

