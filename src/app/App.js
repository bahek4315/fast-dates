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
        const currentState = [...users];
        const foundPosition = currentState.findIndex(item => item._id === id);
        currentState[foundPosition].bookmark = !currentState[foundPosition].bookmark;
        setUsers(currentState);
    };

    if (users.length === 0) {
        return (
            <>
                <SeachStatus quantity={users.length}/>
            </>
        );
    } else {
        return (
            <>
                <SeachStatus quantity={users.length}/>
                <Users usersList={users} onDelete={handleDelete} onBookmark={handleBookmark}/>
            </>
        );
    }
};

export default App;