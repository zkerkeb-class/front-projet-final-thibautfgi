import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/wow';

export const apiGetItembyId = (itemId: number, callback: (data: any | null, error: string | null) => void): void => {
    axios.get(`${API_BASE_URL}/item/${itemId}`)
        .then((response) => {
            const jsonData = response.data; // Les données sont déjà en JSON
            callback(jsonData, null);
        })
        .catch((error) => {
            callback(null, error.message);
        });
};


export const apiGetItemMediabyId = (itemId: number, callback: (data: any | null, error: string | null) => void): void => {
    axios.get(`${API_BASE_URL}/item-media/${itemId}`)
        .then((response) => {
            const jsonData = response.data; // Les données sont déjà en JSON
            callback(jsonData, null);
        })
        .catch((error) => {
            callback(null, error.message);
        });
};