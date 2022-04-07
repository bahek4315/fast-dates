import React from 'react';
import User from './user';

const Users = (props) => {
    let users = props.usersList;

    const renderTable = () => {
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
                            <th>Избранное</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                                <tr key={user._id} >
                                    <User {...user} onDelete={props.onDelete} onBookmark={props.onBookmark}/>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </>
        );
    };
    
    return (
        <>
            {renderTable()}
        </>
    );
};

export default Users;