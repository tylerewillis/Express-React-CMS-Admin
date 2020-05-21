import { API_PATH } from '../_Config'

export default async (url, data, method='POST') => {
  const response = await fetch(API_PATH + url, {
    method: method,
    body: data
  });
  const body = await response.json();
  return body
}