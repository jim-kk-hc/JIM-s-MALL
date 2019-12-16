import {
  request
} from "./request";
import {
  requestTwo
} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return requestTwo({
    url: '/api/v1/home/data',
    params: {
      type,
      page
    }
  })
}
