import React from 'react';
// import Bookmark from './bookmark';
import Quality from './quality';

const User = (props) => {
    const user = props;
    const renderBookmark = (userId, boolean) => {
        if (boolean) {
            return (
                <i className="bi bi-bookmark-fill" onClick={() => user.onBookmark(userId)}></i>
            )
        } else {
            return (
                <i className="bi bi-bookmark" onClick={() => user.onBookmark(userId)}></i>
            )
        }
    }

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
            <td>{renderBookmark(user._id, user.bookmark)}</td>
            <td>{renderButton(user._id)}</td>
        </>
    );
};

export default User;