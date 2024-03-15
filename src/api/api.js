import axios from 'axios'

const instanceAxios = axios.create({
    baseURL: 'http://[::1]:3000/'
    //'http://127.0.0.1:3000/',
})

export const usersApi = {
    getUsers() {
        return instanceAxios.get('')
    },

    getUser(query) {
        return instanceAxios.get('', { params: { term: query } })
    }
}