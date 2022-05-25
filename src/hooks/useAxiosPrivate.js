
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = ()=>{

    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect( () => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] || !config.heaaders['authorization']) {
                    // first attempt
                    if (config.headers === 'Authorization') {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;}
                    else {
                    config.headers['authorization'] = `Bearer ${auth.accessToken}`;}    
                    }
                return config;
            }, (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use( response => response, 
            // token expired 
            async (error) => 
            {   
                const prevRequest = error?.config; // getting the previous request 
               
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    console.log("error status 403");
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    ;
                    if (prevRequest.heaaders['Authorization']) { prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;  }
                    if (prevRequest.heaaders['authorization']) { prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;  }
                    return axiosPrivate(prevRequest);
                }
     
                return Promise.reject(error);
            }
        );

        return () => {
           axiosPrivate.interceptors.request.eject(requestIntercept);
           axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    },[auth, refresh])


    return axiosPrivate;
}


export default useAxiosPrivate;
