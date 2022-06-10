import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage/userPage';
import UserEditPage from '../components/page/userEditPage/userEditPage';
import UserProvider from '../hooks/useUsers';

const Users = () => {
    const params = useParams();
    const { userId, isEdit } = params;
    return (
        <>
            <UserProvider>
                {isEdit ? (
                    <UserEditPage />
                ) : userId ? (
                    <UserPage />
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
