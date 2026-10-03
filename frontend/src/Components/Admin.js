import React from 'react';
import './Admin.css';

const Admin = () => {
    return (
        <div className="admin-page">

            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your StudentEcom marketplace.</p>
            </div>

            <div className="admin-grid">

                <div className="admin-card">
                    <h2>Users</h2>
                    <p>View and manage registered users.</p>
                    <button>Manage Users</button>
                </div>

                <div className="admin-card">
                    <h2>Products</h2>
                    <p>View and manage marketplace products.</p>
                    <button>Manage Products</button>
                </div>

                <div className="admin-card">
                    <h2>Orders</h2>
                    <p>View and manage customer orders.</p>
                    <button>Manage Orders</button>
                </div>

            </div>

        </div>
    );
};

export default Admin;