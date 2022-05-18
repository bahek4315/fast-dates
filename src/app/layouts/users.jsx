import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage/userPage';
import UserEditPage from '../components/page/userEditPage/userEditPage';

const Users = () => {
    const params = useParams();
    const { userId, isEdit } = params;
    return (
        <>
            {isEdit ? (
                <UserEditPage />
            ) : userId ? (
                <UserPage />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
