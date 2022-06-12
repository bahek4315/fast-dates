import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../common/table/tableHeader';
import TableBody from '../common/table/tableBody';
import BookMark from '../common/bookmark';
import Table from '../common/table';
import { Link } from 'react-router-dom';
import Profession from './profession';
import QualitiesListServer from './qualitiesListServer';

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link key={user._id} to={`/users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <>
                    <QualitiesListServer qualities={user.qualities} />
                </>
            )
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
