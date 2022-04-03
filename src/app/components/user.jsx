import React from 'react';
import Bookmark from './bookmark';
import Quality from './quality';

const User = (props) => {
    const user = props;

    const renderButton = (userId) => {
        return <button className="btn btn-danger" onClick={() => user.onDelete(userId)}>Delete</button>;
    };

    return (
        <>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) =>(
                    <Quality key={quality._id} quality={quality}/>
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td><Bookmark id={user._id} state={user.bookmark} onBookmark={user.onBookmark}/></td>
            <td>{renderButton(user._id)}</td>
        </>
    );
};

export default User;