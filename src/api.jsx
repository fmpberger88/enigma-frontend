import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

const handleError = (error) => {
    console.log(error)
    if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
        // Verwenden Sie die vom Backend bereitgestellte Fehlermeldung
        throw new Error(error.response.data.message || error.response.data.error.message || 'An error occurred');
    } else if (error.request) {
        console.error('Error: No response received from server');
        throw new Error('No response received from server');
    } else {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};

export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('auth/register', userData);
        return response.data
    } catch (error) {
        handleError(error);
    }
};

export const login = async (userData) => {
    try {
        const response = await axiosInstance.post('auth/login', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}