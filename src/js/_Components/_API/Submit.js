import { API_PATH } from '../_Config'

export default async (url, data = {}, method = 'POST', path = false) => {

	const fetchPath = (path) ? path + url : API_PATH + url

  const response = await fetch(fetchPath, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data}),
  });
  const body = await response.json();
  return body
}