import axios from 'axios';
import { createRequestThrottle } from './create-request-throttle.ts';

const http = axios.create({
    // ...other config
});
http.interceptors.request.use(createRequestThrottle(1500));
