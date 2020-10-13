import { API_PATH } from '../_Config'

export default async (url, data, method='POST', path = false) => {

	const fetchPath = (path) ? path + url : API_PATH + url

  const response = await fetch(fetchPath, {
    method: method,
    body: data
  });
  const body = await response.json();
  return body
}