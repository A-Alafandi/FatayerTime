import React, { useState } from 'react';
import { api } from '../../utils/auth';
import Notification from '../../components/Notification';
import AdminNavbar from './AdminNavbar';
import styles from './AdminSettings.css';

export default function AdminSettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const validateInputs = () => {
        if (!currentPassword.trim()) return 'Current password is required';
        if (!newUsername.trim()) return 'New username is required';
        if (newPassword && newPassword.length < 6) return 'New password must be at least 6 characters';
        return '';
    };

    const handleSubmit = async () => {
        const error = validateInputs();
        if (error) {
            setNotification({ message: error, type: 'error' });
            return;
        }

        try {
            await api.put('/admin/update', {
                currentPassword,
                newUsername,
                newPassword: newPassword || undefined,
            });
            setNotification({ message: '✅ Account updated successfully.', type: 'success' });
            setCurrentPassword('');
            setNewUsername('');
            setNewPassword('');
        } catch (err) {
            setNotification({ message: `❌ Failed to update account: ${err.message}`, type: 'error' });
        }
    };

    return (
        <div className={styles.settingsContainer}>
            <AdminNavbar />
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
            <div className={styles.settingsCard}>
                <h2 className={styles.settingsTitle}>Manage Admin Account</h2>
                <div className={styles.settingsForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="currentPassword" className={styles.formLabel}>
                            Current Password<span className={styles.required}>*</span>
                        </label>
                        <input
                            id="currentPassword"
                            type="password"
                            className={styles.settingsInput}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newUsername" className={styles.formLabel}>
                            New Username<span className={styles.required}>*</span>
                        </label>
                        <input
                            id="newUsername"
                            type="text"
                            className={styles.settingsInput}
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword" className={styles.formLabel}>New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className={styles.settingsInput}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className={styles.settingsButton}
                        onClick={handleSubmit}
                        aria-label="Update account"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}