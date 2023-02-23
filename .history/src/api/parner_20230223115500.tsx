import axios from 'lib/axios';

export const getParner= async siteurl => {
    const { data } = await axios.get('/posts/' + id);
    console.log(`post ${id} fetched`);
    return data;
}