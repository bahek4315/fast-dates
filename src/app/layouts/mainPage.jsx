import React from 'react';
import useMockData from '../utils/mockData';
const MainPage = () => {
    const { error, initialize, progress, status } = useMockData();

    return (
        <div className="container mt-5">
            <h2>Main Page</h2>
            <h3>Инициализация данных в FireBase</h3>
            <button className="btn btn-primary" onClick={initialize}>
                Инициализировать
            </button>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
        </div>
    );
};

export default MainPage;
