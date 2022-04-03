import React, {useState} from 'react';
import Users from './components/users.jsx';
import SeachStatus from './components/seachStatus';
import api from './api';


const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    
    const handleDelete = (id) => {
        setUsers(prevState => prevState.filter(user => user._id !== id));
    };

    const handleBookmark = (id) => {
        const currentState = Array.from(users);
        const foundPosition = currentState.indexOf(users.find(item => item._id === id));
        if (currentState[foundPosition].bookmark) {
            currentState[foundPosition].bookmark = false;
        } else {
            currentState[foundPosition].bookmark = true;
        }
        setUsers(currentState);
    };
    
    return (
        <>
            <SeachStatus quantity={users.length}/>
            <Users usersList={users} onDelete={handleDelete} onBookmark={handleBookmark}/>
        </>
    );
};

export default App;