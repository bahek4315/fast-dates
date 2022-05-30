import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import Qualities from '../../ui/qualities';

const UserPage = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { userId } = params;

    useEffect(
        () =>
            api.users.getById(userId).then((data) => {
                setUser(data);
            }),
        []
    );
    if (user) {
        return (
            <>
                <h3>{user.name}</h3>
                <h4>{`Профессия: ${user?.profession?.name}`}</h4>
                <div>
                    <Qualities qualities={user?.qualities}></Qualities>
                </div>
                <h4>{`Встретился, раз: ${user.completedMeetings}`}</h4>
                <h4>{`Оценка: ${user.rate}`}</h4>
                <button>
                    <Link to={`/users/${userId}/edit`}>Изменить</Link>
                </button>
            </>
        );
    }
    return '..loading';
};

export default UserPage;
