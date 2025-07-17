import React, { useState, useRef } from 'react';
import '../../styles/AdminPanel.css';
import Spinner from '../spinner/Spinner';
import Notification from '../Notification';
import { apiFetch  } from '../../utils/auth';
import AdminNavbar from "./AdminNavbar";

function AdminSettings() {
    const [form, setForm] = useState({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const usernameInput = useRef();

    // Focus the username field on mount
    React.useEffect(() => {
        usernameInput.current?.focus();
    }, []);

    // Field-level change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        setErrors(errs => ({ ...errs, [name]: undefined }));
        setGeneralError('');
    };

    // Validation
    function validate() {
        const errs = {};
        if (!form.currentPassword.trim()) errs.currentPassword = 'Current password is required';
        if (!form.newUsername.trim()) errs.newUsername = 'New username is required';
        if (form.newPassword && form.newPassword.length < 6)
            errs.newPassword = 'Password must be at least 6 characters';
        if (form.newPassword && form.newPassword !== form.confirmPassword)
            errs.confirmPassword = 'Passwords do not match';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setGeneralError('');
        try {
            await apiFetch.put('/api/admin/update', {
                currentPassword: form.currentPassword,
                newUsername: form.newUsername,
                newPassword: form.newPassword ? form.newPassword : undefined,
            });
            setNotification({ message: 'Profile updated successfully!', type: 'success' });
            setForm({
                currentPassword: '',
                newUsername: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            setGeneralError(err.message || 'Update failed.');
        }
        setLoading(false);
    };

    return (
        <>
        <AdminNavbar />
        <div className="settings-root">
            <h2 className="settings-title">Update Admin Credentials</h2>
            <form className="settings-form" onSubmit={handleSubmit} autoComplete="off" aria-labelledby="settings-title">
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                    <input
                        ref={usernameInput}
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        disabled={loading}
                        aria-required="true"
                        className={errors.currentPassword ? 'input-error' : ''}
                        autoComplete="current-password"
                    />
                    {errors.currentPassword && (
                        <div className="field-error" role="alert">{errors.currentPassword}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="newUsername">New Username<span aria-hidden="true" style={{ color: '#ff6b35' }}>*</span></label>
                    <input
                        id="newUsername"
                        name="newUsername"
                        type="text"
                        value={form.newUsername}
                        onChange={handleChange}
                        disabled={loading}
                        aria-required="true"
                        className={errors.newUsername ? 'input-error' : ''}
                        autoComplete="username"
                    />
                    {errors.newUsername && (
                        <div className="field-error" role="alert">{errors.newUsername}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password <span style={{ color: '#6c757d', fontSize: '0.95em' }}>(optional)</span></label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={form.newPassword}
                        onChange={handleChange}
                        disabled={loading}
                        aria-required="false"
                        autoComplete="new-password"
                        className={errors.newPassword ? 'input-error' : ''}
                    />
                    {errors.newPassword && (
                        <div className="field-error" role="alert">{errors.newPassword}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        disabled={loading || !form.newPassword}
                        aria-required="false"
                        autoComplete="new-password"
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && (
                        <div className="field-error" role="alert">{errors.confirmPassword}</div>
                    )}
                </div>
                {generalError && (
                    <div className="general-error" role="alert">{generalError}</div>
                )}
                <div className="button-row">
                    <button
                        type="submit"
                        disabled={loading}
                        className="save-button"
                    >
                        {loading ? <Spinner size="small" /> : 'Save Changes'}
                    </button>
                </div>
            </form>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
        </>
    );
}

export default AdminSettings;