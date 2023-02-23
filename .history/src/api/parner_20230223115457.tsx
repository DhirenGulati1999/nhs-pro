import axios from 'lib/axios';

export const getParner= async site => {
    const { data } = await axios.get('/posts/' + id);
    console.log(`post ${id} fetched`);
    return data;
}