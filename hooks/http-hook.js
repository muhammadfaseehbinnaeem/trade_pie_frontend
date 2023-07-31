import { useState } from "react";

export const baseUrl = 'http://192.168.100.4:80';

export const useHttpClient = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = async (requestUrl, method = 'GET', body = null, headers = {}) => {
        const serverUrl = 'http://192.168.100.4:80';
        const url = serverUrl + requestUrl;
        // setIsLoading(true);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            
            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
            }

            // setIsLoading(false);
            return responseData;
        } catch (err) {
            setError(err.message);
            // setIsLoading(false);
        }
    };    

    const clearError = () => {
        setError(null);
    };

    return { error, sendRequest, clearError };
};