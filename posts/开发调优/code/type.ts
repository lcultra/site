declare module 'axios' {
    interface InternalAxiosRequestConfig {}
    const create: (args: any) => any;

    export {
        create,
        InternalAxiosRequestConfig,
    };
}
declare module 'http-proxy-agent' {
    const HttpProxyAgent: any;
    export {
        HttpProxyAgent,
    };
}
declare module 'https-proxy-agent' {
    const HttpsProxyAgent: any;
    export {
        HttpsProxyAgent,
    };
}
