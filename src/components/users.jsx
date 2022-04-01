import React, {useState} from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    
    const handleDelete = (id) => {
        setUsers(prevState => prevState.filter(user => user._id !== id));
    };

    const renderButton = (userId) => {
        return <button className="btn btn-danger" onClick={() => handleDelete(userId)}>Delete</button>;
    };
    
    const renderPhrase = () => {
        let phrase = '';
        if (Number(`${users.length}`.slice(-2)) >= 11 && Number(`${users.length}`.slice(-2)) <= 19) {
            phrase = `${users.length} человек`
        } else if (Number(`${users.length}`.slice(-1)) >= 2 && Number(`${users.length}`.slice(-1)) <= 4) {
            phrase = `${users.length} человека`
        } else if (`${users.length}`.slice(-1) === '1') {
            phrase = `${users.length} человек`
        } else if (users.length === 0) {
            return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
        } else {
            phrase = `${users.length} человек`
        }

        return <span className="badge bg-primary">{phrase} тусанет с тобой сегодня</span>;
    };

    const renderQualityClass = (quality) => {
        return `badge bg-${quality.color} mx-1`;
    };

    const renderUser = (user) => {
        return (
            <>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((quality) =>(
                        <span key={quality._id} className={renderQualityClass(quality)}>{quality.name}</span>
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>{renderButton(user._id)}</td>
            </>
        );
    };

    const renderTable = () => {
        if (users.length !== 0) {
            return (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Качества</th>
                                <th>Профессия</th>
                                <th>Встретился, раз</th>
                                <th>Оценка</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                    <tr key={user._id}>
                                        {renderUser(user)}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </>
            );
        }
    };
    
    return (
        <>
            <h2>
                {renderPhrase()}
            </h2>
            {renderTable()}
        </>
    );
};

export default Users;