import axios, { AxiosError } from 'axios'
import { encode as base64_encode } from 'base-64'

//yuriy,robot
//qwerty,12345678

//artem,robot
//test101,12345678
//test102,12345678 not worked
//test103,12345678
export const getToken = () => {
  return axios
    .post(`${process.env.API_BASE_URL}login/`, {
      login: 'test11',
      password: base64_encode('80Besite'),
    })
    .then((response) => {
      localStorage.setItem('token', response?.data?.token)
      return response
    })
    .catch((error: AxiosError) => {
      console.log('error', error)
    })
}
