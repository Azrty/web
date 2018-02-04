import axios from 'axios'

export function auth () {
  return axios.create({
    baseURL: process.env.REACT_APP_API_AUTH,
    timeout: 1000,
    headers: {
      'Authorization': global.localStorage.getItem('token')
    }
  })
}

export function flatSharing () {
  return axios.create({
    baseURL: process.env.REACT_APP_API_COLOC,
    timeout: 1000,
    headers: {
      'Authorization': global.localStorage.getItem('token')
    }
  })
}
