import { normalizeQueryParams, parseQueryParams } from "./url"

const storageKey = "review-info"

const getFromStorage = (key: string) => {
  const data = window.sessionStorage.getItem(key)
  if (!data) {
    return null
  }
  return JSON.parse(data)
}


const setToStorage = (key: string, data: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}
const getReviewData = () => {
  const data =
    parseQueryParams() || getFromStorage(storageKey)
  return data
}

const setReviewData = (data = {}) => {
  setToStorage(storageKey, data)
}

const saveReviewData = () => {
  const data = getReviewData() || {}
  setReviewData(data)
}
const getAll = () =>  normalizeQueryParams(getReviewData())
export const ReviewData = {
  set: setReviewData,
  getAll,
  getApiKey() {
    return getAll()?.apikey
  },
  getVisitId() {
    return getAll()?.visitid
  },
  save: saveReviewData,
}