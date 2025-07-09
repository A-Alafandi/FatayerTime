import React, { useState } from 'react';
import { api } from '../../utils/auth';
import './AdminSettings.css';
import AdminNavbar from "./AdminNavbar";

export default function AdminSettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/admin/update', {
                currentPassword,
                newUsername,
                newPassword,
            });
            setMessage('✅ Account updated successfully.');
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to update account: ' + err.message);
        }
    };

    return (

        <div className="settings-container">
            <AdminNavbar />
            <div className="settings-card">


                <h2 className="settings-title">Manage Admin Account</h2>

                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            className="settings-input"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newUsername">New Username</label>
                        <input
                            id="newUsername"
                            type="text"
                            className="settings-input"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="settings-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="settings-button">Update</button>
                </form>
                {message && <p className="settings-message">{message}</p>}
            </div>
        </div>
    );
}
