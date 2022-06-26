import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserService from '../services/userService';
import { toast } from 'react-toastify';
import localStorageService, {
    setTokens
} from '../services/localStorageService';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();
export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    async function getUserData() {
        try {
            const { content } = await UserService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
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

    async function createUser(data) {
        try {
            const { content } = await UserService.create(data);
            console.log(content);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push('/');
    }

    async function signIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
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

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                completedMeetings: randomInt(0, 200),
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким email уже существует'
                    };
                    throw errorObject;
                }
            }
        }
    }
    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut }}>
            {!isLoading ? children : 'Loading...'}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
