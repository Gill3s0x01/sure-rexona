import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://api-sure.herokuapp.com',
})
