import axios from 'axios';

const usersUrl = 'http://localhost:9002/dailyproductmaster';

export const getDetails = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

