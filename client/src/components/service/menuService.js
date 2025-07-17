// src/services/menuService.js
import { apiFetch } from '../../utils/auth';

export const menuService = {
    /**
     * Get all menu items
     * @returns {Promise<Array>} Array of menu items
     */
    async getMenuItems() {
        try {
            return await apiFetch.get('/api/menu');
        } catch (error) {
            throw new Error(error.message || 'Failed to load menu items');
        }
    },

    /**
     * Create a new menu item
     * @param {Object} itemData - Menu item data
     * @returns {Promise<Object>} Created menu item
     */
    async createMenuItem(itemData) {
        try {
            return await apiFetch.post('/api/menu', itemData);
        } catch (error) {
            throw new Error(error.message || 'Failed to create menu item');
        }
    },

    /**
     * Update an existing menu item
     * @param {string} id - Item ID
     * @param {Object} itemData - Updated item data
     * @returns {Promise<Object>} Updated menu item
     */
    async updateMenuItem(id, itemData) {
        try {
            return await apiFetch.put(`/api/menu/${id}`, itemData);
        } catch (error) {
            throw new Error(error.message || 'Failed to update menu item');
        }
    },

    /**
     * Delete a menu item
     * @param {string} id - Item ID
     * @returns {Promise<void>}
     */
    async deleteMenuItem(id) {
        try {
            await apiFetch.delete(`/api/menu/${id}`);
        } catch (error) {
            throw new Error(error.message || 'Failed to delete menu item');
        }
    },

    /**
     * Search menu items by name
     * @param {Array} items - Array of menu items
     * @param {string} searchTerm - Search term
     * @returns {Array} Filtered items
     */
    filterMenuItems(items, searchTerm) {
        if (!searchTerm) return items;
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
};