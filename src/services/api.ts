import axios from 'axios';

const API_URL = 'http://localhost:4000/connections';

export const fetchConnections = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getConnectionDetails = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("Making API request to:", `${API_URL}/${id}`);

    return response.data;
};

export {};
