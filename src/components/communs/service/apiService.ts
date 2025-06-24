import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/wow';

export const apiGetItemById = (itemId: number, callback: (data: any | null, error: string | null) => void): void => {
    axios.get(`${API_BASE_URL}/item/${itemId}`, { withCredentials: true })
        .then((response) => {
            const jsonData = response.data;
            callback(jsonData, null);
        })
        .catch((error) => {
            callback(null, error.response?.data?.error || error.message);
        });
};

export const apiGetItemMediaById = (itemId: number, callback: (data: any | null, error: string | null) => void): void => {
    axios.get(`${API_BASE_URL}/item-media/${itemId}`, { withCredentials: true })
        .then((response) => {
            const jsonData = response.data;
            callback(jsonData, null);
        })
        .catch((error) => {
            callback(null, error.response?.data?.error || error.message);
        });
};


export const searchItems = (params: {
    name: string;
    _page?: number;
    _pageSize?: number;
    orderby?: string;
}): Promise<any> => {
    return axios.get(`${API_BASE_URL}/search/item`, {
        params: {
            'name': params.name, // le back gère `name.fr_FR`
            _page: params._page,
            _pageSize: params._pageSize,
            orderby: params.orderby,
        },
        withCredentials: true,
    })
        .then((response) => response.data)
        .catch((error) => {
            throw error.response?.data?.error || error.message;
        });
};
