import { axiosInstance } from './authService';

export const snippetService = {
    async getSnippets() {
        try {
            const response = await axiosInstance.get('/snippets');
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error fetching snippets');
        }
    },

    async getSnippetById(id: number) {
        try {
            const response = await axiosInstance.get(`/snippets/byId/${id}`);
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error fetching snippet');
        }
    },

    async getSnippetByUser() {
        try {
            const response = await axiosInstance.get('/snippets/user');
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error fetching user snippets');
        }
    },

    async createSnippet(title: string, description: string, code: string, language: string) {
        try {
            const response = await axiosInstance.post('/snippets', {
                title,
                description,
                code,
                language,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error creating snippet');
        }
    },

    async updateSnippet(id: number, title: string, description: string, code: string, language: string) {
        try {
            const response = await axiosInstance.put(`/snippets/${id}`, {
                title,
                description,
                code,
                language,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error updating snippet');
        }
    },

    async deleteSnippet(id: number) {
        try {
            const response = await axiosInstance.delete(`/snippets/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error deleting snippet');
        }
    },
};
