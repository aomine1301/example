import axios, { AxiosPromise } from 'axios'

export const apiConnectAxios = (functionName: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data?: { [key: string]: any }): AxiosPromise =>
  axios({
    method: method,
    url: `${process.env.API_BASE_URL}${functionName}`,
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      token: localStorage.getItem('token'),
    },
  })
