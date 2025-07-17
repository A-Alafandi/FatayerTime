// src/services/adminService.js
import { apiFetch } from '../utils/auth';

export const adminService = {
    /**
     * Update admin credentials
     * @param {Object} credentials - Current password, new username, and optional new password
     * @returns {Promise<Object>} Updated admin info
     */
    async updateAdminCredentials(credentials) {
        try {
            const { currentPassword, newUsername, newPassword } = credentials;

            const payload = {
                currentPassword,
                newUsername,
                ...(newPassword && { newPassword })
            };

            return await apiFetch.put('/api/admin/update', payload);
        } catch (error) {
            throw new Error(error.message || 'Failed to update admin credentials');
        }
    },

    /**
     * Validate admin credentials update form
     * @param {Object} formData - Form data to validate
     * @returns {Object} Validation errors object
     */
    validateCredentialsForm(formData) {
        const errors = {};

        if (!formData.currentPassword?.trim()) {
            errors.currentPassword = 'Current password is required';
        }

        if (!formData.newUsername?.trim()) {
            errors.newUsername = 'New username is required';
        }

        if (formData.newPassword && formData.newPassword.length < 6) {
            errors.newPassword = 'Password must be at least 6 characters';
        }

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    },

    /**
     * Get admin profile information
     * @returns {Promise<Object>} Admin profile data
     */
    async getAdminProfile() {
        try {
            return await apiFetch.get('/api/admin/profile');
        } catch (error) {
            throw new Error(error.message || 'Failed to load admin profile');
        }
    }
};