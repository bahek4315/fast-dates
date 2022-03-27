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
        const plural= [`11`,`12`,`13`,`14`,`15`,`16`,`17`,`18`,`19`];

        if (plural.includes(`${users.length}`.slice(-2))) {
            return <span className="badge bg-primary">{users.length} человек тусанет с тобой сегодня</span>;
        } else if (`${users.length}`.slice(-1) === '2' || `${users.length}`.slice(-1) === '3' || `${users.length}`.slice(-1) === '4') {
            return <span className="badge bg-primary">{users.length} человека тусанет с тобой сегодня</span>; 
        } else if (`${users.length}`.slice(-1) === '1') {
            return <span className="badge bg-primary">{users.length} человек тусанет с тобой сегодня</span>;
        } else if (users.length === 0) {
            return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
        } else {
            return <span className="badge bg-primary">{users.length} человек тусанет с тобой сегодня</span>;
        }
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