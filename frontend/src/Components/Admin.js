
import React, { useState } from 'react';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Load registered users
    const loadUsers = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Could not load users.');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a selected user
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setUsers((currentUsers) =>
                    currentUsers.filter((user) => user._id !== id)
                );
                setError('');
                setUserToDelete(null);
            } else {
                setError('Could not delete user. Admin accounts cannot delete themselves.');
            }
        } catch (err) {
            setError('Could not connect to the server.');
        }
    };

    return (
        <div className="min-h-screen px-5 py-12 text-slate-800 md:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Dashboard heading */}
                <div className="mb-10">
                    <span className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-widest text-blue-600">
                        ADMINISTRATION
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                        Admin <span className="text-blue-600">Dashboard</span>
                    </h1>

                    <p className="mt-3 text-lg text-slate-500">
                        Manage your StudentEcom marketplace.
                    </p>
                </div>

                {/* Dashboard cards */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Users */}
                    <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-blue-100/50 backdrop-blur-xl lg:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="mb-3 inline-flex rounded-2xl bg-blue-100 p-3 text-2xl">
                                    👥
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900">
                                    Manage Users
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    View and manage registered users.
                                </p>
                            </div>

                            <button
                                onClick={loadUsers}
                                disabled={loading}
                                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                {loading ? 'Loading...' : 'Load Users'}
                            </button>
                        </div>

                        {/* User list */}
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="break-all font-medium text-slate-800">
                                            {user.email}
                                        </p>

                                        <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                                            {user.role || 'user'}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setError('');
                                            setUserToDelete(user);
                                        }}
                                        className="rounded-xl bg-red-50 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>

                        {error && !userToDelete && (
                            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Products and Orders */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-blue-100/50 backdrop-blur-xl">
                            <div className="mb-4 inline-flex rounded-2xl bg-teal-100 p-3 text-2xl">
                                📦
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900">
                                Products
                            </h2>

                            <p className="my-3 text-sm leading-6 text-slate-500">
                                View and manage marketplace products.
                            </p>

                            <button
                                disabled
                                className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-400"
                            >
                                Manage Products — Coming Soon
                            </button>
                        </div>

                        <div className="rounded-3xl border border-white/90 bg-white/85 p-7 shadow-xl shadow-blue-100/50 backdrop-blur-xl">
                            <div className="mb-4 inline-flex rounded-2xl bg-amber-100 p-3 text-2xl">
                                🛒
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900">
                                Orders
                            </h2>

                            <p className="my-3 text-sm leading-6 text-slate-500">
                                Order management is not implemented yet.
                            </p>

                            <button
                                disabled
                                className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-400"
                            >
                                Not Available
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete confirmation popup */}
            {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-2xl"
                    >
                        <div className="mb-5 inline-flex rounded-2xl bg-red-50 p-4 text-3xl">
                            🗑️
                        </div>

                        <h2 id="delete-title" className="text-2xl font-bold text-slate-900">
                            Delete User?
                        </h2>

                        <p className="mt-3 leading-7 text-slate-500">
                            Are you sure you want to delete{' '}
                            <strong className="break-all text-slate-800">
                                {userToDelete.email}
                            </strong>
                            ? This action cannot be undone.
                        </p>

                        {error && (
                            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setError('');
                                    setUserToDelete(null);
                                }}
                                className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => deleteUser(userToDelete._id)}
                                className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
