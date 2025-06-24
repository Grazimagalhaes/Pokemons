import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://6852ca200594059b23cf16ed.mockapi.io/pokemonsms/',
})
