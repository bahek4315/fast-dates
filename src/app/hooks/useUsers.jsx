import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserService from '../services/userService';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }

    async function getUsers() {
        try {
            const { content } = await UserService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : 'Loading...'}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UserProvider;
