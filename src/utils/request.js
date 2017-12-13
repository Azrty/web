import axios from 'axios'

export function auth () {
  return axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 1000,
    headers: {
      'Authorization': global.localStorage.getItem('token')
    }
  })
}

export function flatSharing () {
  return axios.create({
    baseURL: 'http://localhost:3006/',
    timeout: 1000,
    headers: {
      'Authorization': global.localStorage.getItem('token')
    }
  })
}
