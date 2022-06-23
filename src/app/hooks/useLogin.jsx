import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorageService';
import UserService from '../services/userService';

const LoginContext = React.createContext();
const httpLogin = axios.create();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getUserData() {
        try {
            const { content } = await UserService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            setError(error);
        }
    }

    async function signIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            getUserData();
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Пользователь с таким email не найден'
                    };
                    throw errorObject;
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Неверный пароль'
                    };
                    throw errorObject;
                }
            }
        }
    }
    return (
        <LoginContext.Provider value={{ signIn, currentUser }}>
            {children}
        </LoginContext.Provider>
    );
};
LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default LoginProvider;
