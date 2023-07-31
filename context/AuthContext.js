import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

import { useHttpClient } from '../hooks/http-hook';
import ErrorAlert from '../components/ErrorAlert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { error, sendRequest, clearError } = useHttpClient();

    const login = async (requestData) => {
        if (requestData.email === '' || requestData.password === '') {
            ErrorAlert('All fields are required.');
        } else {
            setIsLoading(true);
            
            try {
                const responseData = await sendRequest(
                    '/api/users/login',
                    'POST',
                    JSON.stringify(requestData),
                    {'Content-Type': 'application/json'}
                );
                
                if (responseData.success) {
                    let userInfo = responseData.data;
                    let userToken = responseData.token;
                    
                    setUserInfo(userInfo);
                    setUserToken(userToken);
                    
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    AsyncStorage.setItem('userToken', userToken);
                } else {
                    ErrorAlert(responseData?.error?.message)
                }
            } catch (err) {
                console.log(err);
            }
    
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
            
        try {
            const responseData = await sendRequest(
                '/api/users/logout',
                'POST',
                null,
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                setUserToken(null);
                
                AsyncStorage.removeItem('userInfo');
                AsyncStorage.removeItem('userToken');
            } else {
                ErrorAlert(responseData?.error?.message)
            }
        } catch (err) {
            console.log(err);
        }
        
        setIsLoading(false);
    };

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');

            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
                setUserToken(userToken);
            }
            
            setIsLoading(false);
        } catch (err) {
            console.log(`isLoggedIn error ${err}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};