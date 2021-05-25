const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 5000;
const HOST = "local.tt-devs.com";
const API_SERVICE_URL = "https://zoom.us";
const ZOOM_API_SERVICE_URL = "https://api.zoom.us";

const defaultOptions = {
    changeOrigin: true,
    onProxyReq: (req) => {
        req.setHeader('origin', 'https://developer.zoom.us')
    },
    onProxyRes: (res) => {
        res.headers['access-control-allow-origin'] = 'http://local.tt-devs.com:3000'
    },
}

// Logging
app.use(cors({
    origin: 'http://local.tt-devs.com:3000',
    credentials: true
}))
https://101790d4ec43.ngrok.io/oauth?code=rUiAMuC7oD_lBo3jCXbQFuJUh7zqEDIuA
// Proxy endpoints
app.get('/oauth', (req, res) => {
    res.send(`Query: ${JSON.stringify(req.query)}`)
})
app.use('/auth-zoom', createProxyMiddleware({
    target: API_SERVICE_URL,
    pathRewrite: {
        [`^/auth-zoom`]: '',
    },
    ...defaultOptions    
 }));
app.use('/zoom-api',createProxyMiddleware({
    target: ZOOM_API_SERVICE_URL,
    pathRewrite: {
        [`^/zoom-api`]: '',
    },
    ...defaultOptions
 }));

//  app.use((_, res) => {
//     res.setHeader('Content-Type', 'application/json');
//  })
 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });