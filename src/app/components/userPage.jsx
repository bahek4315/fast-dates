import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import QualitiesList from './qualitiesList';

const UserPage = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { userId } = params;

    api.users.getById(userId).then((data) => setUser(data));

    if (user) {
        return (
            <>
                <h3>{user.name}</h3>
                <h4>{`Профессия: ${user?.profession?.name}`}</h4>
                <div>
                    <QualitiesList qualities={user?.qualities}></QualitiesList>
                </div>
                <h4>{`Встретился, раз: ${user.completedMeetings}`}</h4>
                <h4>{`Оценка: ${user.rate}`}</h4>
                <button>
                    <Link to="/users">Все пользователи</Link>
                </button>
            </>
        );
    }
    return '..loading';
};

export default UserPage;
