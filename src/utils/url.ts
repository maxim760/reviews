const getParams = (params: string) => {
  if(!params) {
    return {}
  }
  let paramsString = params.split('?')[1];
  if (!paramsString) return {};
  
  if (paramsString.endsWith("/")) {
    paramsString = paramsString.slice(0,-1)
  }

  return paramsString.split('&').reduce((acc, param) => {
    const [keyFromUrl = "", value = true] = param.split('=');
    acc[keyFromUrl] = value;

    return acc;
  }, {} as {[key: string]: string | boolean});
}

const getHashParams = () => {
  return getParams(window.location.hash);
}

const getSearchParams = () => {
  return getParams(window.location.search);
}

export const parseQueryParams = () => {
  const params = {
    ...getHashParams(),
    ...getSearchParams()
  }
  if (Object.keys(params).length === 0) {
    return null
  }
  return params
}

export const normalizeQueryParams = (object: {[key: string]: string | boolean} = {}) => {
  return Object.entries(object || {}).reduce((acc, [key, value]) => {
    if(!acc[key.toLowerCase()] ) {
      acc[key.toLowerCase()] = value
    }
    return acc
  }, {} as {[key: string]: string | boolean})
}