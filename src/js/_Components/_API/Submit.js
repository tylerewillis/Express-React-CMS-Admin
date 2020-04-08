import { API_PATH } from '../_Config'

export default async (url, data, method='POST') => {
  const response = await fetch(API_PATH + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data}),
  });
  const body = await response.json();
  return body
}