import React, { useState, useEffect } from 'react';
import { paginate } from '../utils/paginate';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import UsersTable from './usersTable';
import GroupList from './groupList';
import api from '../api';
import _ from 'lodash';
import SearchBar from './searchBar';

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [users, setUsers] = useState();
    const [searchData, setSearchData] = useState('');

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleSearchChange = (evt) => {
        evt.preventDefault();
        clearFilter();
        setSearchData(evt.target.value);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleProfessionSelect = (params) => {
        setSearchData('');
        setSelectedProf(params);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    if (users) {
        const filteredSearchUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchData.toLowerCase())
        );

        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : searchData && filteredSearchUsers.length !== 0
            ? filteredSearchUsers
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const handlePageIncrement = () => {
            if (currentPage < Math.ceil(count / pageSize)) {
                setCurrentPage((prevState) => prevState + 1);
            }
        };

        const handlePageDecrement = () => {
            if (currentPage > 1) {
                setCurrentPage((prevState) => prevState - 1);
            }
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <>
                            <SearchBar
                                onChange={handleSearchChange}
                                value={searchData}
                            />
                            <UsersTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />
                        </>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            onPageDecrement={handlePageDecrement}
                            onPageIncrement={handlePageIncrement}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return 'loading...';
};

export default UsersList;
