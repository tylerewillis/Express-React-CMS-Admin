import { API_PATH } from '../_Config'

export default async (url) => {
  const response = await fetch(API_PATH + url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body
}