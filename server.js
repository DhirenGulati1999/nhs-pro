// const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const https = require('https');
const http = require('http');
// const httpProxy = require('http-proxy');
const { readFileSync } = require('fs');
const { createServer } =https;
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 80;
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
};

// const proxy = createProxyMiddleware({
//     target: 'http://localhost:56887/abor/sso/startsso',
//     changeOrigin: true,
//     // Add any other options as needed
//   });

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    // console.log(parsedUrl.pathname)
    // if(parsedUrl)
    if (parsedUrl.pathname === '/abor/sso/startsso') {
        // console.log(req,"req",req.method)
        
        // console.log(res,"response")

        // const externalApiOptions = {
        //     hostname: 'http://sprint.newhomesourceprofessional.com/',
        //     port: 443,
        //     path: '/abor/sso/startsso',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       // Add any other heade`rs as needed
        //     },
        //   };
      
        //   const externalApiReq = https.request(externalApiOptions, (externalApiRes) => {
        //     let data = '';
      
        //     externalApiRes.on('data', (chunk) => {
        //       data += chunk;
        //     });
      
        //     externalApiRes.on('end', () => {
        //       // Process the response from the external API
        //       console.log('Response from external API:', data);
      
        //       // Respond to the client
        //       res.writeHead(200, { 'Content-Type': 'application/json' });
        //       res.end(JSON.stringify({ message: 'POST request received for /abor/sso/startsso' }));
        //     });
        //   });
        // fetch("https://sprint.newhomesourceprofessional.com/").then((data)=>console.log(data)).catch((e)=>console.log(e))
        // console.log(req,"req first")
        forwardRequest(req, res, 'http://localhost:56887/abor/sso/startsso');

        //   proxy.web(req, res, { target: 'https://sprint.newhomesourceprofessional.com/abor/sso/startsso' });
      
        //   // Handle any errors during the external API request
        //   externalApiReq.on('error', (error) => {
        //     console.error('Error making external API request:', error);
      
        //     // Respond with an error to the client
        //     res.writeHead(500, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ error: 'Internal Server Error' }));
        //   });
      
        //   // Send any necessary data with the external API request
        //   const postData = JSON.stringify({ key: 'value' });
        //   externalApiReq.write(postData);
        //   externalApiReq.end();
        // res.end(JSON.stringify({ message: 'POST request received for /api/postEndpoint1' }));
    }else if(parsedUrl.pathname.includes('/abor/SSO/AssertionConsumerService')){
        console.log(req,"req")
        forwardRequest(req, res, 'http://localhost:56887/abor/SSO/AssertionConsumerService?binding=post');
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

    const targetReq = http.request(targetOptions, (targetRes) => {
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