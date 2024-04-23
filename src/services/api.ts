import axios from 'axios';
import Connection from '../models/connection'; 

const API_URL = 'http://localhost:4000/connections';

export const fetchConnections = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getConnectiionDetails = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("Making API request to:", `${API_URL}/${id}`);

    return response.data;
};

// Add new connection
export const addConnectionToServer = async (connection: Connection): Promise<Connection> => {
    try {
        const response = await axios.post<Connection>(API_URL, connection);
        console.log('Connection added successfully:', response.data);
        return response.data;  // Return the added connection, which might include an ID set by the server
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error adding connection:', error.response?.data || 'Unknown error');
            throw new Error(error.response?.data.message || 'Failed to save the connection');
        } else if (error instanceof Error) {
            console.error('Unexpected error:', error.message); // Now safely accessing error.message
            throw new Error('An unexpected error occurred');
        } else {
            console.error('An unexpected error of unknown type occurred:', error);
            throw new Error('An unexpected error of unknown type occurred');
        }
    }
};


export {};
