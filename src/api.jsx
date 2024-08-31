import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const handleError = (error) => {
    if (error.response) {
        console.error(`Error: ${error.response.status} - ${error.response.data.error || error.response.data.errors}`);

        // Überprüfen, ob 'error' oder 'errors' existieren und sie weiterverarbeiten
        if (error.response.data.error) {
            throw new Error(error.response.data.error);
        } else if (Array.isArray(error.response.data.errors)) {
            const errorMessage = error.response.data.errors.map(err => err.msg).join(' ');
            throw new Error(errorMessage);
        }

        throw new Error('An unknown error occurred');
    } else if (error.request) {
        console.error('Error: No response received from server');
        throw new Error('No response received from server');
    } else {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};


// Registrierung
export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Login
export const login = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Funktion, um den aktuellen Benutzer abzurufen
export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/me');  // Standard-Route für aktuellen Benutzer
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch current user');
    }
};

// Neuen Chat erstellen
export const createChat = async (username) => {
    try {
        const response = await axiosInstance.post('/api/chats/create', { username });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Alle Chats des Benutzers abrufen
export const getChats = async () => {
    try {
        const response = await axiosInstance.get('/api/chats');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Nachricht an einen bestimmten Chat senden
export const sendMessageToChat = async (chatId, content) => {
    try {
        const response = await axiosInstance.post(`/api/chats/${chatId}/message`, { content });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Nachrichten in einem bestimmten Chat abrufen
export const getMessagesInChat = async (chatId) => {
    try {
        const response = await axiosInstance.get(`/api/chats/${chatId}/messages`);
        console.log(response)
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Nachricht als gelesen markieren und nach 30 Sekunden löschen
export const markMessageAsRead = async (messageId) => {
    try {
        const response = await axiosInstance.post(`/api/chats/message/${messageId}/read`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
