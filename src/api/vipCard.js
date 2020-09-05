import axios from './axios';

export function getLists(data,ViewKay) {
  Object.assign(data, {ViewKay:ViewKay})
  return axios({
    url: 'RenderManag.aspx',
    method: 'post',
    data
  })
}
