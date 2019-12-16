import {
  requestTwo
} from './request'


export function getCategory() {
  return requestTwo({
    url: '/api/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return requestTwo({
    url: '/api/v1/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return requestTwo({
    url: '/api/v1/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
