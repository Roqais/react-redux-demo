import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';

const UserView = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div style={{  fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#777' }}>List of Users</h2>
            {user.loading && <div style={{ textAlign: 'center', color: '#555' }}>Loading...</div>}
            {!user.loading && user.error ? (
                <div style={{ textAlign: 'center', color: 'red' }}>Error: {user.error}</div>
            ) : null}
            {!user.loading && user.users.length ? (
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0 auto', maxWidth: '600px' }}>
                    {user.users.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                padding: '0.5rem 1rem',
                                borderBottom: '1px solid #ddd',
                                fontSize: '1rem',
                                color: '#999'
                            }}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default UserView;
