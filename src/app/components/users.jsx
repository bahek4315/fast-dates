import React, { useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userCrop = paginate(users, currentPage, pageSize);

    const handlePageDecrement = () => {
        if (currentPage > 1) {
            setCurrentPage((prevState) => prevState - 1);
        }
    };
    const handlePageIncrement = () => {
        if (currentPage < Math.ceil(count / pageSize)) {
            setCurrentPage((prevState) => prevState + 1);
        }
    };

    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPageDecrement={handlePageDecrement}
                onPageIncrement={handlePageIncrement}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
