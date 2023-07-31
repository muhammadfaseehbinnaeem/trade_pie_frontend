import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './HomeStack';
import UserStack from './UserStack';
import AdminStack from './AdminStack';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';

const AppNav = () => {
    const { isLoading, userToken, userInfo } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <NavigationContainer>
            {
                userToken === null ?
                <HomeStack /> :
                !userInfo.isAdmin ?
                <UserStack /> :
                <AdminStack />
            }
        </NavigationContainer>
    );
};

export default AppNav;