import axios from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

export const http = axios.create({
    proxy: false,
    httpsAgent: new HttpsProxyAgent('http://lcadmin:lcadmin@127.0.0.1:7890'),
    httpAgent: new HttpProxyAgent('http://lcadmin:lcadmin@127.0.0.1:7890'),
    // ...other config
});
