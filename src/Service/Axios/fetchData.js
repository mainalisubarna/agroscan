import axios from 'axios';

export const GET_API = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return error.response.data.results;
    };
}