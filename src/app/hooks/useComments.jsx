import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { nanoid } from 'nanoid';
import CommentService from '../services/commentService';
import { toast } from 'react-toastify';

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
    }, [error]);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await CommentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await CommentService.removeComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await CommentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
                isLoading,
                getComments,
                removeComment
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default CommentsProvider;
